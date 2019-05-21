import React from 'react'
import Block from 'core/components/Block'
import ChartContainer from 'core/charts/ChartContainer'
import RatioChart from 'core/charts/RatioChart'
import sortBy from 'lodash/sortBy'
import round from 'lodash/round'
import compact from 'lodash/compact'

const ToolUsageRatioBlock = ({ block, data }) => {

    const buckets = data.data.aggregations.map(({ id, opinion }) => {
        if (!opinion) {
            return null
        }
        const wouldUse = opinion.buckets.find(b => b.id === 'would_use').count
        const wouldNotUse = opinion.buckets.find(b => b.id === 'would_not_use').count
        const interested = opinion.buckets.find(b => b.id === 'interested').count
        const notInterested = opinion.buckets.find(b => b.id === 'not_interested').count

        const ratio1 = wouldUse / (wouldUse + wouldNotUse)
        const ratio2 = (wouldNotUse) / (wouldUse + wouldNotUse)
        // const percentage = (100 - Math.round(ratio * 100)) / 100
        return {
            id,
            used: round(ratio1, 2),
            not_used1: round(ratio2, 2)/2,
            not_used2: round(ratio2, 2)/2
        }
    })
    const sortedBuckets = compact(sortBy(buckets, 'used'))

    return (
        <Block id={block.id} showDescription={true}>
            <ChartContainer>
                <RatioChart buckets={sortedBuckets} />
            </ChartContainer>
        </Block>
    )
}

export default ToolUsageRatioBlock
