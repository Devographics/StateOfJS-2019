import React, { useState } from 'react'
import Block from 'core/blocks/block/Block'
import compact from 'lodash/compact'
import round from 'lodash/round'
import get from 'lodash/get'
import { getColor, keys } from 'core/constants'
import ToolsScatterplotChart from 'core/charts/tools/ToolsScatterplotChart'
import { useI18n } from 'core/i18n/i18nContext'
import ChartContainer from 'core/charts/ChartContainer'
import ButtonGroup from 'core/components/ButtonGroup'
import Button from 'core/components/Button'
import { toolsCategories } from '../../../../config/variables.yml'

/*

Parse data and convert it into a format compatible with the Scatterplot chart

*/
const getChartData = (data, translate, metric = 'satisfaction') => {
    const allTools = Object.keys(toolsCategories).map(categoryId => {
        const toolsIds = toolsCategories[categoryId]

        const categoryTools = data.filter(tool => toolsIds.includes(tool.id))
        const categoryData =
            categoryTools &&
            categoryTools.map(tool => {
                const { id, entity, experience } = tool
                const name = entity.name
                const buckets = get(experience, 'year.buckets')
                const total = get(experience, 'year.total')

                // if tool doesn't have experience data, abort
                if (!buckets) {
                    return null
                }

                // get count for a given bucket
                const getCount = id => {
                    return buckets && buckets.find(b => b.id === id).count
                }

                const totals = {
                    satisfaction: getCount('would_use') + getCount('would_not_use'),
                    interest: getCount('interested') + getCount('not_interested'),
                    awareness: total
                }

                const getPercentage = id => {
                    return round((getCount(id) / totals[metric]) * 100, 2)
                }

                const percentages = {
                    satisfaction: getPercentage('would_use'),
                    interest: getPercentage('interested'),
                    awareness: 100 - getPercentage('never_heard')
                }

                const node = {
                    id,
                    x: totals[metric],
                    y: percentages[metric],
                    name
                }

                return node
            })
        return categoryData.length > 0
            ? {
                  id: categoryId,
                  name: translate(`page.${categoryId}`),
                  color: getColor(categoryId),
                  data: compact(categoryData)
              }
            : null
    })
    return compact(allTools)
}

const Switcher = ({ setMetric, metric }) => {
    const { translate } = useI18n()

    return (
        <ButtonGroup>
            {['satisfaction', 'interest'].map(key => (
                <Button
                    key={key}
                    size="small"
                    className={`Button--${
                        metric === key ? 'selected' : 'unselected'
                    }`}
                    onClick={() => setMetric(key)}
                >
                    <span className="desktop">{translate(`opinions.legends.${key}_ratio`)}</span>
                    <span className="mobile">{translate(`opinions.legends.${key}_ratio`)[0]}</span>
                </Button>
            ))}
        </ButtonGroup>
    )
}

const ToolsOverviewBlock = ({ block, data }) => {
    const { translate } = useI18n()
    const [metric, setMetric] = useState('satisfaction')
    const chartData = getChartData(data, translate, metric)
    const { id, blockName = id } = block
    const [current, setCurrent] = useState(null)

    const description = translate(`block.description.${blockName}.${metric}`)

    const legends = keys.toolCategories.map(({ id: keyId, color }) => ({
        id: `toolCategories.${keyId}`,
        label: translate(`page.${keyId}.short`),
        keyLabel: `${translate(`page.${keyId}.short`)}:`,
        color
    }))

    return (
        <Block
            className="ToolsScatterplotBlock"
            data={chartData}
            block={{ ...block, description, showLegend: true, legends }}
            titleProps={{ switcher: <Switcher setMetric={setMetric} metric={metric} /> }}
            legendProps={{
                legends,
                onMouseEnter: ({ id }) => {
                    setCurrent(id.replace('toolCategories.', ''))
                },
                onMouseLeave: () => {
                    setCurrent(null)
                }
            }}
        >
            <ChartContainer vscroll={true}>
                <ToolsScatterplotChart
                    data={chartData}
                    metric={metric}
                    showQuadrants={metric === 'satisfaction'}
                    current={current}
                />
            </ChartContainer>
        </Block>
    )
}

export default ToolsOverviewBlock
