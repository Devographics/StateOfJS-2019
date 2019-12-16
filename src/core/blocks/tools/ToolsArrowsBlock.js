import React from 'react'
import PropTypes from 'prop-types'
import Block from 'core/blocks/block/Block'
import ToolsArrowsChart from 'core/charts/tools/ToolsArrowsChart'

const ToolsArrowsBlock = ({ block }) => {
    return (
        <Block block={block}>
            <ToolsArrowsChart />
        </Block>
    )
}

ToolsArrowsBlock.propTypes = {
    block: PropTypes.shape({
        id: PropTypes.string.isRequired,
        dataPath: PropTypes.string.isRequired
    }).isRequired
}

export default ToolsArrowsBlock
