import React from 'react'
import Block from 'core/blocks/block/Block'
import compact from 'lodash/compact'
import { getColor } from 'core/constants.js'
import round from 'lodash/round'
import ToolsScatterplotChart from 'core/charts/tools/ToolsScatterplotChart'
import { useEntities } from 'core/entities/entitiesContext'
import { useI18n } from 'core/i18n/i18nContext'
import ChartContainer from 'core/charts/ChartContainer'
import get from 'lodash/get'
import { toolsCategories } from '../../../../config/variables.yml'

/*

Parse data and convert it into a format compatible with the Scatterplot chart

*/
const getChartData = (data, translate, getName) => {
    const allTools = Object.keys(toolsCategories).map(categoryId => {
        const toolsIds = toolsCategories[categoryId]

        const categoryTools = data.filter(tool => toolsIds.includes(tool.id))
        const categoryData =
            categoryTools &&
            categoryTools.map(tool => {
                const { id, entity, experience } = tool
                const name = entity.name
                const buckets = get(experience, 'year.buckets')

                // if tool doesn't have experience data, abort
                if (!buckets) {
                    return null
                }

                // get count for a given bucket
                const getCount = id => {
                    return buckets && buckets.find(b => b.id === id).count
                }

                const usersCount = getCount('would_use') + getCount('would_not_use')
                const satisfactionPercentage = round((getCount('would_use') / usersCount) * 100, 2)

                const node = {
                    id,
                    x: usersCount,
                    y: satisfactionPercentage,
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

const ToolsOverviewBlock = ({ block, data }) => {
    const { translate } = useI18n()
    const { getName } = useEntities()

    const chartData = getChartData(data, translate, getName)

    return (
        <Block className="ToolsScatterplotBlock" data={chartData} block={block}>
            <ChartContainer vscroll={true}>
                <ToolsScatterplotChart data={chartData} />
            </ChartContainer>
        </Block>
    )
}

export default ToolsOverviewBlock
