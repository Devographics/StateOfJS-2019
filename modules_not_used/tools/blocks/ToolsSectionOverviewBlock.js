import React, { memo, useMemo } from 'react'
import Block from 'core/blocks/block/Block'
import { usePageContext } from 'core/helpers/pageContext'
import ToolsOpinionBumpChart from '../charts/tools_opinion_bump_chart/ToolsOpinionBumpChart'
import ToolsOpinionBumpChartLegend from '../charts/ToolsOpinionBumpChartLegend'
import ChartContainer from 'core/charts/ChartContainer'

const ToolsSectionOverviewBlock = ({ data, block }) => {
    const { id, showDescription } = block
    const context = usePageContext()
    const toolsData = useMemo(
        () =>
            context.blocks
                .filter(block => block.type === 'tool')
                .map(block => data.data.aggregations.find(agg => agg.id === block.id)),
        [data, context.blocks]
    )

    return (
        <Block id={id} showDescription={showDescription}>
            <ChartContainer fit={true}>
                <ToolsOpinionBumpChart data={toolsData} />
            </ChartContainer>
            <ToolsOpinionBumpChartLegend />
        </Block>
    )
}

export default memo(ToolsSectionOverviewBlock)
