import React from 'react'
import Block from 'core/components/Block'
import ToolOpinionsOverTimeChart from '../charts/ToolOpinionsOverTimeChart'
import ChartContainer from 'core/charts/ChartContainer'

const ToolOpinionsOverTimeBlock = ({ block, data }) => {
    return (
        <Block id={block.id} showDescription={false} block={block} data={data}>
            <ChartContainer>
                <ToolOpinionsOverTimeChart data={data} />
            </ChartContainer>
        </Block>
    )
}

export default ToolOpinionsOverTimeBlock
