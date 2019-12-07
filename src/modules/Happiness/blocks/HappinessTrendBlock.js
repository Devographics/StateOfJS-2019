import React from 'react'
import PropTypes from 'prop-types'
import Block from 'core/components/Block'
import HappinessTrendChart from '../charts/HappinessTrendChart'

const HappinessTrendBlock = ({ block, data }) => {
    return (
        <Block
            id={block.id}
            className="Block--happiness Happiness__Block"
            showDescription={block.showDescription}
        >
            <HappinessTrendChart data={data} />
        </Block>
    )
}

HappinessTrendBlock.propTypes = {
    block: PropTypes.shape({
        id: PropTypes.string.isRequired,
        showDescription: PropTypes.bool.isRequired
    }).isRequired,
    data: PropTypes.arrayOf(
        PropTypes.shape({
            year: PropTypes.number.isRequired,
            mean: PropTypes.number.isRequired
        })
    ).isRequired
}

export default HappinessTrendBlock
