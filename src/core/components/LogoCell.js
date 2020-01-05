import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { mq } from 'core/theme'

const Cell = ({ index, text, color }) => {
    return (
        <Container style={{ color }}>
            <Index>{index}</Index>
            {text}
        </Container>
    )
}

Cell.propTypes = {
    text: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
}

const Container = styled.span`
    width: 67px;
    height: 67px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26px;
    position: relative;
    border-left: ${props => props.theme.separationBorder};

    @media ${mq.smallMedium} {
        &:last-child {
            border-right: ${props => props.theme.separationBorder};
        }
    }

    @media ${mq.large} {
        &:first-child {
            border-left: 0;
        }
    }
`

const Index = styled.span`
    position: absolute;
    top: 0;
    left: 0;
    font-size: 12px;
    line-height: 12px;
    padding: 6px 8px;
    color: ${props => props.theme.colors.text};
    opacity: 0.35;
    font-weight: 300;
`

export default Cell
