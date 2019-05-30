import React from 'react'
import Block from 'core/components/Block'
import ToolsCirclePackingChart from '../charts/ToolsOverviewCirclePackingChart'
import compact from 'lodash/compact'
import { colors } from '../../../constants'
import round from 'lodash/round'
import ToolOpinionsLegend from '../charts/ToolLegend'
import { useEntities } from 'core/entities/entitiesContext'

export const opinions = [
    {
        id: 'would_use',
        color: colors.greenDark
    },
    // {
    //     id: 'separator',
    //     color: 'transparent'
    // },
    {
        id: 'interested',
        color: colors.greenLight
    },
    {
        id: 'not_interested',
        color: colors.pinkLight
    },
    // {
    //     id: 'separator',
    //     color: 'transparent'
    // },
    {
        id: 'would_not_use',
        color: colors.pink
    }
]

/*

Parse data and convert it into a format compatible with the Circle Packing chart

*/
const getChartData = (data, getName) => {

    const buckets = opinions.filter(o => o.id !== 'never_heard')

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
                    offsetPercent: round((offsetSum / toolTotal) * 100, 2),
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
            children: compact(tools)
        }
    })

    // return root node
    return {
        id: 'root',
        children: sections
    }
}

const ToolsOverviewBlock = ({ data }) => {

    const { getName } = useEntities()

    const chartData = getChartData(data, getName)

    return (
        <Block id="tools-overview" showDescription={true} className="ToolsOverviewBlock">
            <ToolOpinionsLegend
                // withFrame={false}
                // layout="vertical"
                opinions={opinions.filter(o => o.id !== 'never_heard')}
            />
            <ToolsCirclePackingChart data={chartData} />
        </Block>
    )
}

export default ToolsOverviewBlock
