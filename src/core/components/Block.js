import React, { memo } from 'react'
import PropTypes from 'prop-types'
import BlockTitle from './BlockTitle'
import ShareBlockDebug from '../share/ShareBlockDebug'

const Block = ({
    id,
    isShareable,
    className,
    children,
    units,
    setUnits,
    error,
    data,
    block = {}
}) => {
    return (
        <div id={block.id} className={`Block${className !== undefined ? ` ${className}` : ''}`}>
            <BlockTitle
                isShareable={isShareable}
                units={units}
                setUnits={setUnits}
                data={data}
                block={block}
            />
            {isShareable && <ShareBlockDebug id={block.id} />}
            <div className="Block__Contents">
                {error ? <div className="error">{error}</div> : children}
            </div>
        </div>
    )
}

Block.propTypes = {
    block: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.node,
        description: PropTypes.node
    }).isRequired,
    // data: PropTypes.shape({
    //     completion: PropTypes.shape({
    //         count: PropTypes.number.isRequired,
    //         percentage: PropTypes.number.isRequired
    //     })
    // }),
    showDescription: PropTypes.bool.isRequired,
    isShareable: PropTypes.bool.isRequired,
    className: PropTypes.string,
    values: PropTypes.object
}
Block.defaultProps = {
    showDescription: true,
    isShareable: true
}

export default memo(Block)
