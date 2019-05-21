import React from 'react'
import Block from 'core/components/Block'
import ChartContainer from 'core/charts/ChartContainer'
import RatioChart from '../charts/RatioChart'
import sortBy from 'lodash/sortBy'
import round from 'lodash/round'

const RatioBlock = ({ block, data }) => {
    const buckets = data.data.aggregations.map(({ id, usage }) => {
        const neverHeard = usage.buckets.find(b => b.id === 'never_heard_not_sure').count
        const notUsed = usage.buckets.find(b => b.id === 'know_not_used').count
        const usedIt = usage.buckets.find(b => b.id === 'used_it').count
        const ratio = usedIt / (usedIt + notUsed)
        const percentage = (100 - Math.round(ratio * 100)) / 100
        return {
            id,
            used: round(usedIt / (usedIt + notUsed), 2),
            not_used1: round(notUsed / (usedIt + notUsed), 2)/2,
            not_used2: round(notUsed / (usedIt + notUsed), 2)/2
        }
    })
    const sortedBuckets = sortBy(buckets, 'used')

    return (
        <Block id={block.id} showDescription={true}>
            <ChartContainer>
                <RatioChart buckets={sortedBuckets} />
            </ChartContainer>
        </Block>
    )
}

export default RatioBlock
