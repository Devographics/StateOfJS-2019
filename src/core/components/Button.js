import React from 'react'
import styled from 'styled-components'
import mq from 'core/theme/mq'

const Button = styled.div.attrs(({ className, size = 'medium', ...props }) => {
    return {
        className: `Button Button--${size}${className ? ` ${className}` : ''}`
    }
})`
    background: none;
    padding: ${({ theme }) => theme.spacing / 2}px ${({ theme }) => theme.spacing}px;
    cursor: pointer;
    display: block;
    text-align: center;
    white-space: nowrap;
    font-weight: ${({ theme }) => theme.typography.weights.bold};
    border: 1px solid ${({ theme }) => theme.colors.text};

    @media ${mq.small} {
        font-size: ${({ theme }) => theme.typography.sizes.small};
    }
    @media ${mq.mediumLarge} {
        font-size: ${({ theme }) => theme.typography.sizes.medium};
    }

    &,
    &:link,
    &:visited {
        color: ${({ theme }) => theme.colors.text};
        text-decoration: none;
    }

    &.Button--small {
        font-size: ${({ theme }) => theme.typography.sizes.small};
        padding: ${({ theme }) => theme.spacing / 5}px ${({ theme }) => theme.spacing / 2}px;
    }

    &.Button--large {
        @media ${mq.small} {
            font-size: ${({ theme }) => theme.typography.sizes.large};
            padding: ${({ theme }) => theme.spacing * .75}px;
        }
        @media ${mq.mediumLarge} {
            font-size: ${({ theme }) => theme.typography.sizes.larger};
            padding: ${({ theme }) => theme.spacing}px;
        }
    }

    &:hover {
        color: ${({ theme }) => theme.colors.contrast};
        border-color: ${({ theme }) => theme.colors.contrast};
        border-style: solid;
        text-decoration: none;
        background: ${({ theme }) => theme.colors.backgroundAlt};
    }

    &.Button--selected {
        background: ${({ theme }) => theme.colors.backgroundAlt};
        cursor: default;
        pointer-events: none;
        border-style: solid;
    }

    .ButtonGroup & {
        border-left-width: 0;
        &:first-child {
            border-left-width: 1px;
        }

        &:hover {
            border-left-color: $border-color;
            border-right-color: $border-color;

            &:first-child {
                border-left-color: $hover-color;
            }
            &:last-child {
                border-right-color: $hover-color;
            }
        }
    }

    .ButtonGroup {
        & {
            &--active {
                cursor: default;
                pointer-events: none;
            }
        }
    }
`

export default Button
