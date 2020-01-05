import React, { memo } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import mq from 'core/theme/mq'
import BlockTitle from 'core/blocks/block/BlockTitle'
import ShareBlockDebug from 'core/share/ShareBlockDebug'
import BlockLegends from 'core/blocks/block/BlockLegends'

const Container = styled.div`
    @media ${mq.small} {
        margin-bottom: ${props => props.theme.spacing * 2}px;
    }
    
    @media ${mq.mediumLarge} {
        margin-bottom: ${props => props.theme.spacing * 4}px;
    }
    
    &:last-child {
        margin-bottom: 0;
    }
`

const Block = ({
    isShareable,
    className,
    children,
    units,
    setUnits,
    error,
    data,
    block = {},
    legendProps,
    titleProps,
    blockFooter = null,
}) => {
    const { id, showLegend } = block

    return (
        <Container
            id={id}
            className={`Block Block--${id}${className !== undefined ? ` ${className}` : ''}`}
        >
            <BlockTitle
                isShareable={isShareable}
                units={units}
                setUnits={setUnits}
                data={data}
                block={block}
                {...titleProps}
            />
            {isShareable && <ShareBlockDebug block={block} />}
            <div className="Block__Contents">
                {error ? <div className="error">{error}</div> : children}
            </div>
            {showLegend && (
                <BlockLegends block={block} data={data} units={units} {...legendProps} />
            )}
            {blockFooter}
        </Container>
    )
}

Block.propTypes = {
    block: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.node,
        description: PropTypes.node
    }).isRequired,
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
