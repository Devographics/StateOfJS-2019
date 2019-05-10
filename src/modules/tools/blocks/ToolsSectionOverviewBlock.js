import React, { memo, useMemo } from 'react'
import Block from 'core/components/Block'
import { usePageContext } from 'core/helpers/pageContext'
import ToolsOpinionMultiBarDivergingChart from '../charts/ToolsOpinionMultiBarDivergingChart'
import ToolsOpinionBumpChart from '../charts/tools_opinion_bump_chart/ToolsOpinionBumpChart'

const ToolsSectionOverviewBlock = ({ data }) => {
    const context = usePageContext()
    const toolsData = useMemo(
        () =>
            context.blocks
                .filter(block => block.type === 'tool')
                .map(block => data.data.aggregations.find(agg => agg.id === block.id)),
        [context.blocks]
    )

    return (
        <Block id="overview" showDescription={false}>
            <ToolsOpinionBumpChart data={toolsData} />
            <ToolsOpinionMultiBarDivergingChart data={toolsData} />
        </Block>
    )
}

export default memo(ToolsSectionOverviewBlock)
