import React, { memo, useMemo } from 'react'
import PropTypes from 'prop-types'
import { ranges } from '../../constants'
import Block from 'core/components/Block'
import ChartContainer from 'core/charts/ChartContainer'
import RangeBreakdownBarChart from 'core/charts/RangeBreakdownBarChart'

const RangeBreakdownBlock = ({ block, data }) => {
    if (!data || !data.data) {
        return (
            <div>
                RangeBreakdownBlock: Missing data for block {block.id}, page data is undefined
            </div>
        )
    }

    const rangeKeys = ranges[block.rangeId]
    if (!Array.isArray(rangeKeys)) {
        return (
            <div>
                RangeBreakdownBlock: Missing range keys for block {block.id}, rangeId:{' '}
                {block.rangeId || 'undefined'}
            </div>
        )
    }

    const blockData = useMemo(() => data.data.aggregations.find(agg => agg.id === block.id), [
        block,
        data.data
    ])
    if (!blockData) {
        return <div>RangeBreakdownBlock: Missing data for block {block.id}</div>
    }
    if (
        blockData[block.dataKey] === undefined ||
        !Array.isArray(blockData[block.dataKey].buckets)
    ) {
        return (
            <div>
                RangeBreakdownBlock: Non existing or invalid data key {block.data.key} for block{' '}
                {block.id}
            </div>
        )
    }

    const sortedBuckets = useMemo(
        () =>
            rangeKeys.map(rangeKey => {
                const bucket = blockData[block.dataKey].buckets.find(b => b.id === rangeKey)
                if (bucket === undefined) {
                    throw new Error(
                        `no bucket found for range key: '${rangeKey}' in block: ${block.id}`
                    )
                }

                return bucket
            }),
        [blockData, block.dataKey, rangeKeys]
    )

    console.log({ sortedBuckets })

    return (
        <Block id={block.id} showDescription={!!block.showDescription}>
            <ChartContainer>
                <RangeBreakdownBarChart
                    keys={rangeKeys}
                    buckets={sortedBuckets}
                    i18nNamespace={block.id}
                />
            </ChartContainer>
        </Block>
    )
}

RangeBreakdownBlock.propTypes = {
    block: PropTypes.shape({
        id: PropTypes.string.isRequired,
        rangeId: PropTypes.string.isRequired,
        dataKey: PropTypes.string.isRequired,
        showDescription: PropTypes.bool
    }).isRequired,
    data: PropTypes.shape({
        data: PropTypes.shape({
            aggregations: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.string.isRequired
                })
            ).isRequired
        }).isRequired
    }).isRequired
}

export default memo(RangeBreakdownBlock)
