import React from 'react'
import Block from 'core/components/Block'
import ToolsSunburstChart from '../charts/ToolsSunburstChart'
import ToolsCirclePackingChart from '../charts/ToolsCirclePackingChart'
import compact from 'lodash/compact'
import { colors, opinions } from '../../../constants'

const getData = data => {
    const sections = data.tools.nodes.map(section => {
        const { section_id, aggregations } = section

        const tools = aggregations.map(tool => {
            if (!tool.opinion) {
                return null
            }

            const getCount = id => tool.opinion.buckets.find(b => b.id === id).count
            const getColor = id => opinions.find(b => b.id === id).color

            const getNode = id => ({
                id,
                count: getCount(id),
                color: getColor(id)
            })

            return {
                id: tool.id,
                children: [getNode('interested'), getNode('not_interested'), getNode('would_use'), getNode('would_not_use')]
            }
        })

        return {
            id: section_id,
            color: '#00ff00',
            children: compact(tools)
        }
    })

    return {
        id: 'root',
        children: sections
    }
}

const ToolsOverviewBlock = ({ data }) => {
    const chartData = getData(data)

    return (
        <Block id="tools-overview" showDescription={true}>
            <ToolsCirclePackingChart data={chartData} />
        </Block>
    )
}

export default ToolsOverviewBlock
