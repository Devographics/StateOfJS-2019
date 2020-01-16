import styled from 'styled-components'
import { mq, fontSize, fontWeight, spacing, color } from 'core/theme'

const Button = styled.div.attrs(({ className, size = 'medium', ...props }) => {
    return {
        className: `Button Button--${size}${className ? ` ${className}` : ''}`
    }
})`
    background: none;
    padding: ${spacing(0.5)} ${spacing(1)};
    cursor: pointer;
    display: block;
    text-align: center;
    white-space: nowrap;
    font-weight: ${fontWeight('bold')};
    border: 1px solid ${color('text')};

    @media ${mq.small} {
        font-size: ${fontSize('small')};
    }
    @media ${mq.mediumLarge} {
        font-size: ${fontSize('medium')};
    }

    &,
    &:link,
    &:visited {
        color: ${color('text')};
        text-decoration: none;
    }

    &.Button--small {
        font-size: ${fontSize('small')};
        padding: ${spacing(0.2)} ${spacing(0.5)};
    }

    &.Button--large {
        @media ${mq.small} {
            font-size: ${fontSize('large')};
            padding: ${spacing(0.75)};
        }
        @media ${mq.mediumLarge} {
            font-size: ${fontSize('larger')};
            padding: ${spacing(1)};
        }
    }

    &:hover {
        color: ${color('contrast')};
        border-color: ${color('contrast')};
        border-style: solid;
        text-decoration: none;
        background: ${color('backgroundAlt')};
    }

    &.Button--selected {
        background: ${color('backgroundAlt')};
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
