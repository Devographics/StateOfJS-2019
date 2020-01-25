import React from 'react'
import PropTypes from 'prop-types'
import blockRegistry from 'core/helpers/blockRegistry'
import { keys } from 'core/constants'
import isEmpty from 'lodash/isEmpty'
import Block from 'core/blocks/block/Block'
import get from 'lodash/get'

const BlockSwitcher = ({ pageData, block, index }) => {
    const { id, blockType } = block
    let blockData
    if (!blockRegistry[blockType]) {
        return (
            <BlockError
                block={block}
                message={`Missing Block Component! Block ID: ${id} | type: ${blockType}`}
            />
        )
    }
    const BlockComponent = blockRegistry[blockType]
    if (block.dataPath) {
        blockData = get(pageData, block.dataPath)
        if (!blockData || blockData === null || isEmpty(blockData)) {
            return (
                <BlockError
                    block={block}
                    message={`No available data for block ${id} | type: ${blockType}`}
                />
            )
        }
    }
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
                <BlockError
                    block={block}
                    message={error.message}
                    data={get(pageData, block.dataPath)}
                />
            )
        }
        return this.props.children
    }
}

const BlockError = ({ message, data, block }) => (
    <Block block={block}>
        <div className="error">{message}</div>
        {data && !isEmpty(data) && (
            <pre className="error error-data">
                <code>{JSON.stringify(data, '', 2)}</code>
            </pre>
        )}
    </Block>
)

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
