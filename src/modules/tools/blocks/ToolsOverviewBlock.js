import React from 'react'
import Block from 'core/components/Block'
import ToolsCirclePackingChart from '../charts/ToolsOverviewCirclePackingChart'
import compact from 'lodash/compact'
import { opinions } from '../../../constants'
import round from 'lodash/round'
import ToolLegend from '../charts/ToolLegend'
import { useEntities } from 'core/entities/entitiesContext'
import { useI18n } from 'core/i18n/i18nContext'
import ChartContainer from 'core/charts/ChartContainer'

export const chartSegments = ['would_use', 'interested', 'not_interested', 'would_not_use']

/*

Parse data and convert it into a format compatible with the Circle Packing chart

*/
const getChartData = (data, translate, getName) => {
    const buckets = chartSegments.map(id => opinions.find(o => o.id === id))

    const sections = data.tools.nodes.map(section => {
        const { section_id, aggregations } = section

        const tools = aggregations.map(tool => {
            // if tool doesn't have opinions data, abort
            if (!tool.opinion) {
                return null
            }

            // get count for a given bucket
            const getCount = id =>
                id === 'separator' ? 100 : tool.opinion.buckets.find(b => b.id === id).count

            // get sum of all other buckets up to current bucket
            const getSum = id => {
                const index = id ? buckets.findIndex(b => b.id === id) : buckets.length
                let count = 0
                for (let i = 0; i < index; i++) {
                    count += getCount(buckets[i].id)
                }
                return count
            }

            const toolTotal = getSum()

            // get bucket node
            const getNode = ({ id, color }) => {
                const count = getCount(id)
                const offsetSum = getSum(id) // value by which to offset the arc segment
                return {
                    id,
                    count,
                    percent: round((count / toolTotal) * 100, 2),
                    color,
                    offsetSum,
                    offsetPercent: round((offsetSum / toolTotal) * 100, 2)
                }
            }

            const node = {
                id: tool.id,
                opinions: buckets.map(getNode),
                count: toolTotal,
                name: getName(tool.id)
            }
            return node
        })

        // return section node
        return {
            id: section_id,
            children: compact(tools),
            name: translate(`page.${section_id}`)
        }
    })

    // return root node
    return {
        id: 'root',
        children: sections
    }
}

const ToolsOverviewBlock = ({ data }) => {
    const { translate } = useI18n()
    const { getName } = useEntities()

    const chartData = getChartData(data, translate, getName)

    return (
        <Block id="tools-overview" showDescription={true} className="ToolsOverviewBlock">
            <ChartContainer className="TechnologiesOverviewContainer" vscroll={true}>
                <ToolsCirclePackingChart data={chartData} className="TechnologiesOverviewChart" />
            </ChartContainer>
            <ToolLegend opinions={opinions.filter(o => o.id !== 'never_heard')} />
        </Block>
    )
}

export default ToolsOverviewBlock
