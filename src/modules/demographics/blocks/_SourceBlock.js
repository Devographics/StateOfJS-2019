import React, { memo, useMemo } from 'react'
import PropTypes from 'prop-types'
import Block from 'core/components/Block'
import SourceWaffleChart from '../charts/SourceWaffleChart'

const SourceBlock = ({ block, data }) => {
    const blockData = useMemo(() => data.data.aggregations.find(agg => agg.id === block.id), [
        block.id,
        data.data.aggregations
    ])

    return (
        <Block id={block.id} showDescription={false} className="Block--gender Gender__Block">
            <SourceWaffleChart data={blockData.breakdown.buckets} />
        </Block>
    )
}

SourceBlock.propTypes = {
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

export default memo(SourceBlock)
