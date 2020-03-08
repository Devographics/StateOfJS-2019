import { memo, useState, useCallback } from 'react'
import styled from 'styled-components'
import { mq, spacing, fontSize } from 'core/theme'
import { usePageContext } from 'core/helpers/pageContext'
import { useI18n } from 'core/i18n/i18nContext'
import Locales from './Locales'

const svgs = {
    top: <polygon stroke="#000" points="0,50 100,50 50,0" />,
    bottom: <polygon stroke="#000" points="0,0 100,0 50,50" />
}

const LanguageSwitcher = ({ position = 'bottom', positionOpen = 'top' }) => {
    const { translate } = useI18n()
    const context = usePageContext()
    const [isOpened, setIsOpened] = useState(false)
    const toggle = useCallback(() => setIsOpened(flag => !flag), [])

    return (
        <Container
            className={`LanguageSwitcher LanguageSwitcher--${position} ${
                isOpened ? '_is-opened' : '_is-closed'
            }`}
        >
            <LanguageSwitcherInner className="LanguageSwitcherInner">
                <LanguageSwitcherToggle className="LanguageSwitcherToggle" onClick={toggle}>
                    <span>{context.localeLabel}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 50">
                        {isOpened ? svgs[positionOpen] : svgs[position]}
                    </svg>
                </LanguageSwitcherToggle>
                <LanguageSwitcherPopup className="LanguageSwitcherPopup" position={position}>
                    <Locales />
                    <LanguageSwitcherHelp className="LanguageSwitcherHelp">
                        <a href="https://github.com/StateOfJS/State-of-JS-2019/issues/8">
                            {translate('general.help_us_translate')}
                        </a>
                    </LanguageSwitcherHelp>
                </LanguageSwitcherPopup>
            </LanguageSwitcherInner>
        </Container>
    )
}

const Container = styled.div`
    .Pagination & {
        @media ${mq.smallMedium} {
            display: none;
        }
    }

    .Sidebar & {
        margin-bottom: ${spacing(1)};
        border: ${({ theme }) => theme.separationBorder};

        @media ${mq.large} {
            display: none;
        }
    }
`

const LanguageSwitcherInner = styled.div`
    position: relative;

    .Sidebar & {
        padding: 8px 12px;
    }
`

const LanguageSwitcherToggle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${fontSize('medium')};
    cursor: pointer;

    span {
        display: block;
        margin-right: ${spacing(0.25)};
    }

    svg {
        display: block;
        width: 12px;
        position: relative;
        polygon {
            fill: ${({ theme }) => theme.colors.text};
        }
    }

    .Pagination & {
        padding: ${spacing(1)};
    }

    @media ${mq.smallMedium} {
        font-size: ${fontSize('small')};
    }
`

const ARROW_SIZE = 18

const LanguageSwitcherPopup = styled.div`
    position: absolute;
    top: 125%;
    width: 300px;
    left: 50%;
    padding: ${spacing(1)};
    background: ${props => props.theme.colors.background};
    border: ${props => props.theme.separationBorder};
    transform: translateX(-50%);
    z-index: 10000;
    box-shadow: ${({ theme }) => theme.blockShadow};

    &:before {
        left: 50%;
        border: solid transparent;
        content: ' ';
        height: ${ARROW_SIZE}px;
        width: ${ARROW_SIZE}px;
        background: ${props => props.theme.colors.background};
        position: absolute;
        pointer-events: none;
        transform-origin: center center;
        border: ${props => props.theme.separationBorder};
        top: 0;
        transform: translate(${ARROW_SIZE * -0.5}px, ${ARROW_SIZE * -0.5}px) rotate(-45deg);
        border-bottom: 0;
        border-left: 0;
    }

    @media ${mq.smallMedium} {
        top: 145%;
    }

    @media ${mq.xSmall} {
        max-width: 90vw;
    }

    .LanguageSwitcher._is-closed & {
        display: none;
        // @include sr-only;
    }
}
`

const LanguageSwitcherHelp = styled.div`
    font-size: ${fontSize('small')};
    padding-top: ${spacing(1)};
    margin-top: ${spacing(1)};
    border-top: ${props => props.theme.separationBorder};
`

export default memo(LanguageSwitcher)
