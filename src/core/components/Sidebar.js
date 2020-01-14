import React from 'react'
import Nav from './Nav'
import LogoCompact from './LogoCompact'
import Link from 'core/components/LocaleLink'
import ShareSite from '../share/ShareSite'
import { useI18n } from 'core/i18n/i18nContext'

const Close = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <g id="Outline_Icons_1_">
            <g
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                id="Outline_Icons"
            >
                <line x1=".5" y1=".5" x2="23.5" y2="23.5" />
                <line x1="23.5" y1=".5" x2=".5" y2="23.5" />
            </g>
        </g>
    </svg>
)

const Sidebar = ({ showSidebar, sidebarClassName, closeSidebar, rest }) => {
    const { translate } = useI18n()

    return (
        <nav className={`Sidebar ${sidebarClassName}`}>
            <div className="Sidebar__Fixed">
                <div className="Sidebar__Logo__Wrapper Logo__Wrapper">
                    <h1 className="Sidebar__Title sr-only">{translate('general.title')}</h1>
                    <span className="Sidebar__Logo--mobile Logo--mobile">
                        <div />
                        <div className="Sidebar__Logo__Inner">
                            <Link to="/">
                                <LogoCompact />
                                <span className="sr-only">
                                    {translate('general.back_to_intro')}
                                </span>
                            </Link>
                        </div>
                        <span className="Sidebar__Close">
                            <button onClick={closeSidebar}>
                                <Close />
                                <span className="sr-only">{translate('general.close_nav')}</span>
                            </button>
                        </span>
                    </span>
                    <div className="Sidebar__Logo--desktop Logo--desktop">
                        <Link className="Sidebar__Logo__Link" to="/">
                            <LogoCompact />
                            <span className="sr-only">{translate('general.back_to_intro')}</span>
                        </Link>
                    </div>
                </div>
                <div className="Sidebar__Inner">
                    <Nav {...rest} closeSidebar={closeSidebar} />
                </div>
                <div className="Sidebar__Footer">
                    <ShareSite />
                </div>
            </div>
        </nav>
    )
}

export default Sidebar
