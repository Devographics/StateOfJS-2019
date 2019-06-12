import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BlockTitle from './BlockTitle'
import ShareBlockDebug from '../share/ShareBlockDebug'

export default class Block extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        showDescription: PropTypes.bool.isRequired,
        isShareable: PropTypes.bool.isRequired,
        className: PropTypes.string,
        values: PropTypes.object
    }

    static defaultProps = {
        showDescription: true,
        isShareable: true
    }

    render() {
        const {
            id,
            showDescription,
            isShareable,
            className,
            values,
            children,
            title,
            units,
            setUnits,
            total,
        } = this.props

        return (
            <div id={id} className={`Block${className !== undefined ? ` ${className}` : ''}`}>
                <BlockTitle
                    id={id}
                    showDescription={showDescription}
                    isShareable={isShareable}
                    values={values}
                    title={title}
                    units={units}
                    setUnits={setUnits}
                    total={total}
                />
                {isShareable && <ShareBlockDebug id={id} />}
                <div className="Block__Contents">{children}</div>
            </div>
        )
    }
}
