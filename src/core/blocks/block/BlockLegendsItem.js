import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

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
        const {
            color,
            label,
            keyLabel,
            chipSize,
            style,
            chipStyle,
            data,
            units,
            onMouseEnter
        } = this.props

        const isInteractive = typeof onMouseEnter !== 'undefined'

        return (
            <Container
                className={`Legends__Item ${keyLabel ? 'Legends__Item--withKeyLabel' : ''}`}
                style={style}
                isInteractive={isInteractive}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                onClick={this.handleClick}
            >
                {color ? (
                    <Chip
                        style={{
                            width: chipSize,
                            height: chipSize,
                            background: color,
                            ...chipStyle
                        }}
                    />
                ) : keyLabel ? (
                    <span className="Legends__Item__KeyLabel">{keyLabel} </span>
                ) : null}
                <Label
                    className="Legends__Item__Label"
                    dangerouslySetInnerHTML={{ __html: label }}
                />
                {data && (
                    <Value className="Legends__Item__Value">
                        {units === 'percentage' ? `${data[units]}%` : data[units]}
                    </Value>
                )}
            </Container>
        )
    }
}

const Container = styled.div`
    display: flex;
    align-items: center;
    cursor: default;
    flex: 1;

    &:last-child {
        margin-bottom: 0;
    }

    ${props => {
        if (props.isInteractive) {
            return `
                cursor: pointer;
                &:hover {
                    background: ${props.theme.colors.backgroundAlt};
                }
            `
        }
    }}
`

const Chip = styled.span`
    display: block;
    margin-right: ${props => props.theme.spacing / 2}px;
    flex-shrink: 0;
`

const Label = styled.span`
    padding-right: ${props => props.theme.spacing}px;
`

const Value = styled.span`
    display: inline-block;
    margin-left: ${props => props.theme.spacing / 2}px;
`
