import React, { memo, useMemo } from 'react'
import PropTypes from 'prop-types'
import { keys } from '../../constants'
import Block from 'core/components/Block'
import ChartContainer from 'core/charts/ChartContainer'
import VerticalBarChart from 'core/charts/VerticalBarChart'

const VerticalBarBlock = ({ block, data }) => {
    if (!data || !data.data) {
        return (
            <div>VerticalBarBlock: Missing data for block {block.id}, page data is undefined</div>
        )
    }

    const bucketKeys = keys[block.bucketKeys]
    if (!Array.isArray(bucketKeys)) {
        return (
            <div>
                VerticalBarBlock: Missing bucket keys for block {block.id}, bucketKeys:{' '}
                {block.bucketKeys || 'undefined'}
            </div>
        )
    }

    const blockData = useMemo(() => data.data.aggregations.find(agg => agg.id === block.id), [
        block,
        data.data
    ])
    if (!blockData) {
        return <div>VerticalBarBlock: Missing data for block {block.id}</div>
    }
    if (
        blockData[block.dataKey] === undefined ||
        !Array.isArray(blockData[block.dataKey].buckets)
    ) {
        return (
            <div>
                VerticalBarBlock: Non existing or invalid data key {block.data.key} for block{' '}
                {block.id}
            </div>
        )
    }

    const sortedBuckets = useMemo(
        () =>
            bucketKeys.map(bucketKey => {
                const bucket = blockData[block.dataKey].buckets.find(b => b.id === bucketKey)
                if (bucket === undefined) {
                    throw new Error(`no bucket found for key: '${bucketKey}' in block: ${block.id}`)
                }

                return bucket
            }),
        [blockData, block.dataKey, bucketKeys]
    )

    return (
        <Block id={block.id} showDescription={!!block.showDescription}>
            <ChartContainer>
                <VerticalBarChart
                    keys={bucketKeys}
                    buckets={sortedBuckets}
                    i18nNamespace={block.id}
                />
            </ChartContainer>
        </Block>
    )
}

VerticalBarBlock.propTypes = {
    block: PropTypes.shape({
        id: PropTypes.string.isRequired,
        dataKey: PropTypes.string.isRequired,
        bucketKeys: PropTypes.oneOf(Object.keys(keys)).isRequired,
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

export default memo(VerticalBarBlock)
