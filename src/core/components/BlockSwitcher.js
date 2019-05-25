import React from 'react'
import PropTypes from 'prop-types'
import blockRegistry from '../helpers/blockRegistry'
import { keys } from '../../constants'

const DefaultComponent = ({ block }) => (
    <p>
        Missing Block Component! Block ID: {block.id} | type: {block.type}
    </p>
)

const BlockSwitcher = ({ data, block, index }) => {
    if (!data) {
        return (
            <div>
                No available data for block {block.id} | type: {block.type}
            </div>
        )
    }
    const { type } = block
    const BlockComponent = blockRegistry[type] ? blockRegistry[type] : DefaultComponent

    return <BlockComponent block={block} data={data} index={index} />
}

BlockSwitcher.propTypes = {
    block: PropTypes.shape({
        id: PropTypes.string.isRequired,
        type: PropTypes.oneOf(Object.keys(blockRegistry)).isRequired,
        // key used to pick the block's data from the page's data
        dataKey: PropTypes.string,
        // key used to pick bucket keys
        bucketKeys: PropTypes.oneOf(Object.keys(keys)),
        // enable/disable block description
        showDescription: PropTypes.bool,
        // which unit to use for generic bar charts
        units: PropTypes.oneOf(['percentage', 'count'])
    }),
    data: PropTypes.any.isRequired
}

export default BlockSwitcher
