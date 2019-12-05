import React from 'react'
import PropTypes from 'prop-types'
import blockRegistry from '../helpers/blockRegistry'
import { keys } from '../../constants'
import isEmpty from 'lodash/isEmpty'
import Block from 'core/components/Block'
import get from 'lodash/get'

const BlockSwitcher = ({ pageData, block, index }) => {
    const { id, type } = block
    if (!pageData || pageData === null || isEmpty(pageData)) {
        throw new Error(`No available page data for block ${id} | type: ${type}`)
    }
    if (!blockRegistry[type]) {
        throw new Error(`Missing Block Component! Block ID: ${id} | type: ${type}`)
    }
    const BlockComponent = blockRegistry[type]
    const blockData = get(pageData, block.dataPath)
    return <BlockComponent block={block} data={blockData} index={index} />
}

class ErrorBoundary extends React.Component {
    state = {}
    static getDerivedStateFromError(error) {
        return { error }
    }
    render() {
        const { error } = this.state
        const { id } = this.props.block
        if (error) {
            return <Block id={id} error={error.message} />
        }
        return this.props.children
    }
}

const BlockSwitcherWithBoundary = props => (
    <ErrorBoundary block={props.block}>
        <BlockSwitcher {...props} />
    </ErrorBoundary>
)

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
        // which mode to use for generic bar charts
        mode: PropTypes.oneOf(['absolute', 'relative']),
        // which unit to use for generic bar charts
        units: PropTypes.oneOf(['percentage', 'count'])
    }),
    data: PropTypes.any.isRequired
}

export default BlockSwitcherWithBoundary
