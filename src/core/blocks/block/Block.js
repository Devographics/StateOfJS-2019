import React, { memo } from 'react'
import PropTypes from 'prop-types'
import BlockTitle from 'core/blocks/block/BlockTitle'
import ShareBlockDebug from 'core/share/ShareBlockDebug'
import BlockLegends from 'core/blocks/block/BlockLegends'

const Block = ({
    isShareable,
    className,
    children,
    units,
    setUnits,
    error,
    data,
    legendLayout,
    block = {},
    legendProps,
    titleProps,
}) => {
    const { id, showLegend } = block

    return (
        <div id={id} className={`Block${className !== undefined ? ` ${className}` : ''}`}>
            <BlockTitle
                isShareable={isShareable}
                units={units}
                setUnits={setUnits}
                data={data}
                block={block}
                {...titleProps}
            />
            {isShareable && <ShareBlockDebug id={id} />}
            <div className="Block__Contents">
                {error ? <div className="error">{error}</div> : children}
            </div>
            {(showLegend) && (
                <BlockLegends
                    block={block}
                    layout={legendLayout}
                    data={data}
                    units={units}
                    {...legendProps}
                />
            )}
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
