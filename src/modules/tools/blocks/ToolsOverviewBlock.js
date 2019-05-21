import React from 'react'
import Block from 'core/components/Block'
import ToolsSunburstChart from '../charts/ToolsSunburstChart'
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

            // const usageBucket = tool.opinion.buckets.find(b => b.id === 'used_it')
            // const knowNotUsedBucket = tool.opinion.buckets.find(b => b.id === 'know_not_used')

            const interestNode = {
                id: 'not_used',
                color: '#ff00ff',
                children: [getNode('interested'), getNode('not_interested')]
            }

            const satisfactionNode = {
                id: 'used',
                color: '#ff00ff',
                children: [getNode('would_use'), getNode('would_not_use')]
            }
            return {
                id: tool.id,
                children: [interestNode, satisfactionNode]
                // awareness: usageBucket.count + knowNotUsedBucket.count,
                // usage: usageBucket.count,
                // unusedCount: knowNotUsedBucket.count
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
            <ToolsSunburstChart data={chartData} />
        </Block>
    )
}

export default ToolsOverviewBlock
