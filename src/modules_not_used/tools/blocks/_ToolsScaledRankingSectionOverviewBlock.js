import React, { memo, useMemo } from 'react'
import Block from 'core/blocks/block/Block'
import { usePageContext } from 'core/helpers/pageContext'
import ToolsScaledRankingSectionOverviewChart from 'modules/tools/charts/ToolsScaledRankingSectionOverviewChart'

const ToolsScaledRankingSectionOverviewBlock = ({ data }) => {
    const context = usePageContext()
    const toolsData = useMemo(
        () =>
            context.blocks
                .filter(block => block.type === 'tool')
                .map(block => {
                    const toolData = data.data.aggregations.find(agg => agg.id === block.id)
                    const { total, buckets } = toolData.opinion

                    const neverHeard = buckets.find(bucket => bucket.id === 'never_heard')
                    const interested = buckets.find(bucket => bucket.id === 'interested')
                    const notInterested = buckets.find(bucket => bucket.id === 'not_interested')
                    const wouldUse = buckets.find(bucket => bucket.id === 'would_use')
                    const wouldNotUse = buckets.find(bucket => bucket.id === 'would_not_use')

                    const awareness = (total - neverHeard.count) / total
                    const interest = interested.count / (interested.count + notInterested.count)
                    const satisfaction = wouldUse.count / (wouldUse.count + wouldNotUse.count)

                    return {
                        id: block.id,
                        data: [
                            { x: 'awareness', y: awareness },
                            { x: 'interest', y: interest },
                            { x: 'satisfaction', y: satisfaction }
                        ]
                    }
                }),
        [context.blocks, data.data.aggregations]
    )

    return (
        <Block id="overview" showDescription={false}>
            <ToolsScaledRankingSectionOverviewChart data={toolsData} />
        </Block>
    )
}

export default memo(ToolsScaledRankingSectionOverviewBlock)
