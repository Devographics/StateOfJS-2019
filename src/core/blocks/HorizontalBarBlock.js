import React, { memo, useMemo } from 'react'
import PropTypes from 'prop-types'
import Block from 'core/components/Block'
import ChartContainer from 'core/charts/ChartContainer'
import HorizontalBarChart from '../charts/HorizontalBarChart'

const HorizontalBarBlock = ({ block, data, dataKey }) => {
    if (!data || !data.data) {
        return (
            <div>HorizontalBarBlock: Missing data for block {block.id}, page data is undefined</div>
        )
    }

    const blockData = useMemo(() => data.data.aggregations.find(agg => agg.id === block.id), [
        block,
        data.data
    ])
    if (!blockData) {
        return <div>HorizontalBarBlock: Missing data for block {block.id}</div>
    }
    if (
        blockData[block.dataKey] === undefined ||
        !Array.isArray(blockData[block.dataKey].buckets)
    ) {
        return (
            <div>
                HorizontalBarBlock: Non existing or invalid data key {block.data.key} for block{' '}
                {block.id}
            </div>
        )
    }

    return (
        <Block id={block.id} showDescription={true}>
            <ChartContainer>
                <HorizontalBarChart
                    buckets={blockData[block.dataKey].buckets}
                    i18nNamespace={block.id}
                />
            </ChartContainer>
        </Block>
    )
}

HorizontalBarBlock.propTypes = {
    block: PropTypes.shape({
        id: PropTypes.string.isRequired,
        dataKey: PropTypes.string.isRequired
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

export default memo(HorizontalBarBlock)
