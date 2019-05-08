import React, { memo, useMemo } from 'react'
import Block from 'core/components/Block'
import { usePageContext } from 'core/helpers/pageContext'
import ToolsOpinionMultiBarDivergingChart from '../charts/ToolsOpinionMultiBarDivergingChart'
import ToolsOpinionMultiBarChart from '../charts/ToolsOpinionMultiBarChart'

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
            <ToolsOpinionMultiBarDivergingChart data={toolsData} />
            <ToolsOpinionMultiBarChart data={toolsData} />
        </Block>
    )
}

export default memo(ToolsSectionOverviewBlock)
