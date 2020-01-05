import React, { memo, useState, useCallback } from 'react'
import styled from 'styled-components'
import mq from 'core/theme/mq'
import { usePageContext } from 'core/helpers/pageContext'
import { useI18n } from 'core/i18n/i18nContext'
import Locales from './Locales'

const svgs = {
    top: <polygon stroke="#000" points="0,50 100,50 50,0" />,
    bottom: <polygon stroke="#000" points="0,0 100,0 50,50" />
}

const ARROW_SIZE = 24

const Popup = styled.div`
    position: absolute;
    top: ${props => (props.position === 'bottom' ? '120%' : undefined)};
    bottom: ${props => (props.position === 'top' ? '160%' : undefined)};
    width: 300px;
    left: 50%;
    padding: ${props => props.theme.spacing}px;
    background: ${props => props.theme.colors.background};
    border: ${props => props.theme.separationBorder};
    transform: translateX(-50%);
    z-index: 10000;
    box-shadow: -5px 16px 0 0 rgba(0, 0, 0, 0.15);

    &:after,
    &:before {
        left: 50%;
        border: solid transparent;
        content: ' ';
        height: ${ARROW_SIZE}px;
        width: ${ARROW_SIZE}px;
        background: ${props => props.theme.colors.background};
        position: absolute;
        pointer-events: none;
        transform-origin; center center;
        border: ${props => props.theme.separationBorder};
    }
    
    &:before {
        display: ${props => (props.position === 'top' ? 'none' : 'block')};
        top: 0;
        transform: translate(${ARROW_SIZE * -0.5}px, ${ARROW_SIZE * -0.5}px) rotate(-45deg);
        border-bottom: 0;
        border-left: 0;
    }
    
    &:after {
        display: ${props => (props.position === 'bottom' ? 'none' : 'block')};
        bottom: 0;
        transform: translate(${ARROW_SIZE * -0.5}px, ${ARROW_SIZE * 0.5}px) rotate(-45deg);
        border-top: 0;
        border-right: 0;
    }
    
    @media ${mq.xSmall} {
        max-width: 90vw;
    }
}
`

const Help = styled.div`
    font-size: ${props => props.theme.typography.sizes.small};
    padding-top: ${props => props.theme.spacing}px;
    margin-top: ${props => props.theme.spacing}px;
    border-top: ${props => props.theme.separationBorder};
`

const LanguageSwitcher = ({ position = 'bottom', positionOpen = 'top' }) => {
    const { translate } = useI18n()

    const context = usePageContext()
    const [isOpened, setIsOpened] = useState(false)
    const toggle = useCallback(() => setIsOpened(flag => !flag), [])

    return (
        <div
            className={`LanguageSwitcher LanguageSwitcher--${position} LanguageSwitcher--${
                isOpened ? 'open' : 'closed'
            }`}
        >
            <div className="LanguageSwitcher__Inner">
                <div className="LanguageSwitcher__Toggle" onClick={toggle}>
                    <span>{context.localeLabel}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 50">
                        {isOpened ? svgs[positionOpen] : svgs[position]}
                    </svg>
                </div>
                <Popup className="LanguageSwitcher__Options" position={position}>
                    <Locales />
                    <Help className="LanguageSwitcher__Help">
                        <a href="https://github.com/StateOfJS/State-of-JS-2019/issues/8">
                            {translate('general.help_us_translate')}
                        </a>
                    </Help>
                </Popup>
            </div>
        </div>
    )
}

export default memo(LanguageSwitcher)
