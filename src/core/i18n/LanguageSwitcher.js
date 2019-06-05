import React, { memo, useState, useCallback } from 'react'
import Locales from './Locales'
import { usePageContext } from '../helpers/pageContext'
import { useI18n } from 'core/i18n/i18nContext'

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
                {isOpened && (
                    <div className="LanguageSwitcher__Options">
                        <Locales />
                        <div className="LanguageSwitcher__Help"><a href="https://github.com/StateOfJS/state-of-css-2019/issues/30">{translate('general.help_us_translate')}</a></div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default memo(LanguageSwitcher)
