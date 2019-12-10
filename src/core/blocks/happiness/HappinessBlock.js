import React from 'react'
import PropTypes from 'prop-types'
import Block from 'core/components/Block'
import HappinessChart from 'core/charts/happiness/HappinessChart'

const HappinessBlock = ({ block, data }) => {
    return (
        <Block
            data={data}
            block={block}
        >
            <HappinessChart data={data} />
        </Block>
    )
}

HappinessBlock.propTypes = {
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

export default HappinessBlock
