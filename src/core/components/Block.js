import React, { memo } from 'react'
import PropTypes from 'prop-types'
import BlockTitle from './BlockTitle'
import ShareBlockDebug from '../share/ShareBlockDebug'

const Block = ({
    id,
    title,
    description,
    showDescription,
    isShareable,
    className,
    values,
    children,
    units,
    setUnits,
    completion,
    error,
    data,
    block
}) => {
    return (
        <div id={id} className={`Block${className !== undefined ? ` ${className}` : ''}`}>
            <BlockTitle
                id={id}
                title={title}
                description={description}
                showDescription={showDescription}
                isShareable={isShareable}
                values={values}
                units={units}
                setUnits={setUnits}
                completion={completion}
                data={data}
                block={block}
            />
            {isShareable && <ShareBlockDebug id={id} />}
            <div className="Block__Contents">
                {error ? <div className="error">{error}</div> : children}
            </div>
        </div>
    )
}

Block.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.node,
    description: PropTypes.node,
    showDescription: PropTypes.bool.isRequired,
    isShareable: PropTypes.bool.isRequired,
    className: PropTypes.string,
    values: PropTypes.object,
    completion: PropTypes.shape({
        count: PropTypes.number.isRequired,
        percentage: PropTypes.number.isRequired
    })
}
Block.defaultProps = {
    showDescription: true,
    isShareable: true
}

export default memo(Block)
