import React from 'react'
import styled from 'styled-components'
import mq from 'core/theme/mq'

const Link = styled.a`
    display: block;
    flex-shrink: 0;

    &:last-child {
        margin-right: 0;
    }

    svg {
        height: 100%;
        width: 100%;

        circle,
        path {
            fill: ${({ theme }) => theme.colors.text};
        }
    }

    &:hover {
        svg path,
        svg circle {
            fill: ${({ theme }) => theme.colors.contrast};
        }
    }

    @media ${mq.small} {
        top: 0;
        left: 0;
        position: absolute;
    }

    .ShareBlock & {
        transition: all 500ms cubic-bezier(0.87, -0.41, 0.19, 1.44);
        opacity: 0;
        height: 24px;
        width: 24px;

        @media ${mq.small} {
            transform: translate(-50%, -50%);
        }

        &.ShareLink--twitter {
            transition-delay: 0ms;
        }
        &.ShareLink--facebook {
            transition-delay: 100ms;
        }
        &.ShareLink--linkedin {
            transition-delay: 200ms;
        }
        &.ShareLink--email {
            transition-delay: 300ms;
        }
        &.ShareLink--image {
            transition-delay: 400ms;
        }
    }
    .ShareBlock._is-visible & {
        opacity: 1;
        pointer-events: auto;

        &.ShareLink--twitter {
            @media ${mq.small} {
                transform: translateX(-50%) translateY(-275%);
            }
            @media ${mq.mediumLarge} {
                transform: translateX(280%);
            }
        }
        &.ShareLink--facebook {
            @media ${mq.small} {
                transform: translateX(-200%) translateY(-200%);
            }
            @media ${mq.mediumLarge} {
                transform: translateX(320%);
            }
        }
        &.ShareLink--linkedin {
            @media ${mq.mediumLarge} {
                transform: translateX(390%);
            }
            @media ${mq.small} {
                transform: translateX(-275%) translateY(-50%);
            }
        }
        &.ShareLink--email {
            @media ${mq.small} {
                transform: translateX(-200%) translateY(100%);
            }
            @media ${mq.mediumLarge} {
                transform: translateX(460%);
            }
        }
        &.ShareLink--image {
            @media ${mq.small} {
                transform: translateX(-50%) translateY(175%);
            }
            @media ${mq.mediumLarge} {
                transform: translateX(530%);
            }
        }
    }

    .ShareSite & {
        transition: none;
        flex-grow: 1;
        text-align: center;
        padding: ${({ theme }) => theme.spacing}px ${({ theme }) => theme.spacing / 3}px;
        border-right: ${({ theme }) => theme.separationBorder};

        &:hover {
            background: ${({ theme }) => theme.colors.backgroundAlt};
        }

        svg {
            display: block;
            margin: 0 auto;
            height: 24px;
            width: 24px;
        }
    }
`

const ShareLink = ({ media, ...props }) => (
    <Link {...props} className={`ShareLink ShareLink--${media}`} />
)

export default ShareLink
