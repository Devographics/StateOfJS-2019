import React from 'react'
import PropTypes from 'prop-types'
import blockRegistry from '../helpers/blockRegistry'
import { keys } from 'core/constants.js'
import isEmpty from 'lodash/isEmpty'
import Block from 'core/components/Block'
import get from 'lodash/get'

const BlockSwitcher = ({ pageData, block, index }) => {
    const { id, blockType } = block
    if (!pageData || pageData === null || isEmpty(pageData)) {
        throw new Error(`No available page data for block ${id} | type: ${blockType}`)
    }
    if (!blockRegistry[blockType]) {
        throw new Error(`Missing Block Component! Block ID: ${id} | type: ${blockType}`)
    }
    const BlockComponent = blockRegistry[blockType]
    const blockData = get(pageData, block.dataPath)
    return <BlockComponent block={block} data={blockData} index={index} />
}

class ErrorBoundary extends React.Component {
    state = {}
    static getDerivedStateFromError(error) {
        return { error }
    }
    render() {
        const { block, pageData } = this.props
        const { error } = this.state
        if (error) {
            return (
                <Block block={block}>
                    <div className="error">{error.message}</div>
                    <pre className="error error-data">
                        <code>{JSON.stringify(get(pageData, block.dataPath), '', 2)}</code>
                    </pre>
                </Block>
            )
        }
        return this.props.children
    }
}

const BlockSwitcherWithBoundary = props => (
    <ErrorBoundary {...props}>
        <BlockSwitcher {...props} />
    </ErrorBoundary>
)

BlockSwitcher.propTypes = {
    block: PropTypes.shape({
        id: PropTypes.string.isRequired,
        blockType: PropTypes.oneOf(Object.keys(blockRegistry)).isRequired,
        // key used to pick the block's data from the page's data
        dataPath: PropTypes.string,
        // key used to pick bucket keys
        bucketKeysName: PropTypes.oneOf(Object.keys(keys)),
        // enable/disable block description
        showDescription: PropTypes.bool,
        // which mode to use for generic bar charts
        mode: PropTypes.oneOf(['absolute', 'relative']),
        // which unit to use for generic bar charts
        units: PropTypes.oneOf(['percentage', 'count'])
    }),
    pageData: PropTypes.any.isRequired
}

export default BlockSwitcherWithBoundary
