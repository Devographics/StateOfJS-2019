import React, { memo, useContext, useMemo } from 'react'
import Block from 'core/components/Block'
import { PageContext } from 'core/helpers/pageContext'
import ToolsOpinionMultiBarDivergingChart from '../charts/ToolsOpinionMultiBarDivergingChart'
import ToolsOpinionMultiBarChart from '../charts/ToolsOpinionMultiBarChart'

const ToolsSectionOverviewBlock = ({ data }) => {
    const context = useContext(PageContext)
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
