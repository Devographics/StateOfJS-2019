import React, { memo, useMemo } from 'react'
import PropTypes from 'prop-types'
import Block from 'core/components/Block'
import SourceBreakdownWaffleChart from '../charts/SourceBreakdownWaffleChart'

const SourceBreakdownBlock = ({ block, data }) => {
    const blockData = useMemo(() => data.data.aggregations.find(agg => agg.id === block.id), [
        block.id,
        data.data.aggregations
    ])

    console.log({ blockData })

    return (
        <Block id={block.id} showDescription={false} className="Block--gender Gender__Block">
            <SourceBreakdownWaffleChart data={blockData.breakdown.buckets} />
        </Block>
    )
}

SourceBreakdownBlock.propTypes = {
    block: PropTypes.shape({
        id: PropTypes.string.isRequired
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

export default memo(SourceBreakdownBlock)
