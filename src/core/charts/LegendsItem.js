import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class LegendsItem extends Component {
    static propTypes = {
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        label: PropTypes.string.isRequired,
        color: PropTypes.string,
        keyLabel: PropTypes.string,
        style: PropTypes.object.isRequired,
        chipSize: PropTypes.number.isRequired,
        chipStyle: PropTypes.object.isRequired,
        onMouseEnter: PropTypes.func,
        onMouseLeave: PropTypes.func,
        onClick: PropTypes.func
    }

    static defaultProps = {
        style: {},
        chipStyle: {}
    }

    handleMouseEnter = () => {
        const { onMouseEnter, id, label, color } = this.props
        if (onMouseEnter === undefined) return
        onMouseEnter({ id, label, color })
    }

    handleMouseLeave = () => {
        const { onMouseLeave, id, label, color } = this.props
        if (onMouseLeave === undefined) return
        onMouseLeave({ id, label, color })
    }

    handleClick = () => {
        const { onClick, id, label, color } = this.props
        if (onClick === undefined) return
        onClick({ id, label, color })
    }

    render() {
        const { color, label, keyLabel, chipSize, style, chipStyle } = this.props

        return (
            <div
                className="Legends__Item"
                style={style}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                onClick={this.handleClick}
            >
                {color && (
                    <span
                        className="Legends__Item__Chip"
                        style={{
                            width: chipSize,
                            height: chipSize,
                            background: color,
                            ...chipStyle
                        }}
                    />
                )}
                {keyLabel && <span className="Legends__Item__KeyLabel">{keyLabel}</span>}
                <span className="Legends__Item__Label">{label}</span>
            </div>
        )
    }
}
