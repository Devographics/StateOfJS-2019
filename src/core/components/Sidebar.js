import React from 'react'
import LocaleLink from 'core/components/LocaleLink'
import styled from 'styled-components'
import ShareSite from 'core/share/ShareSite'
import { useI18n } from 'core/i18n/i18nContext'
import Nav from 'core/components/Nav'
import LogoCompact from 'core/components/LogoCompact'
import { mq, color, spacing } from 'core/theme'

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10">
            <line x1=".5" y1=".5" x2="23.5" y2="23.5" />
            <line x1="23.5" y1=".5" x2=".5" y2="23.5" />
        </g>
    </svg>
)

const Sidebar = ({ sidebarClassName, closeSidebar, rest }) => {
    const { translate } = useI18n()

    return (
        <Container className={`Sidebar ${sidebarClassName}`}>
            <div className="Sidebar__Fixed">
                <div className="Sidebar__Logo__Wrapper Logo__Wrapper">
                    <h1 className="Sidebar__Title sr-only">{translate('general.title')}</h1>
                    <SidebarMobileLogo className="Sidebar__Logo--mobile Logo--mobile">
                        <div />
                        <div className="Sidebar__Logo__Inner">
                            <SidebarLogoLink className="SidebarLogoLink" to="/">
                                <LogoCompact />
                                <span className="sr-only">
                                    {translate('general.back_to_intro')}
                                </span>
                            </SidebarLogoLink>
                        </div>
                        <SidebarCloseButton className="SidebarCloseButton" onClick={closeSidebar}>
                            <CloseIcon />
                            <span className="sr-only">{translate('general.close_nav')}</span>
                        </SidebarCloseButton>
                    </SidebarMobileLogo>
                    <div className="Sidebar__Logo--desktop Logo--desktop">
                        <LocaleLink to="/">
                            <SidebarLogoLink className="SidebarLogoLink">
                                <LogoCompact />
                                <span className="sr-only">
                                    {translate('general.back_to_intro')}
                                </span>
                            </SidebarLogoLink>
                        </LocaleLink>
                    </div>
                </div>
                <div className="Sidebar__Inner">
                    <Nav {...rest} closeSidebar={closeSidebar} />
                </div>
                <ShareSite />
            </div>
        </Container>
    )
}

const Container = styled.nav`
    border-right: ${props => props.theme.separationBorder};

    @media ${mq.smallMedium} {
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: ${color('background')};
        z-index: 1000;
        text-align: center;
        overflow-y: scroll;
        padding: 0 0 ${spacing(2)} 0;
        overflow: hidden;
        overflow-y: scroll;
        position: fixed;
    }
`

const SidebarLogoLink = styled.a`
    &:hover {
        text-decoration: none;
    }
`

const SidebarMobileLogo = styled.div`
    display: grid;
    grid-template-columns: 50px 1fr 50px;
    border-bottom: ${({ theme }) => theme.separationBorder};

    @media ${mq.large} {
        display: none;
    }
`

const SidebarCloseButton = styled.button`
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: none;
    cursor: pointer;
    border: none;

    &:focus {
        outline: 0;
    }

    svg {
        stroke: ${color('link')};
    }

    @media ${mq.large} {
        display: none;
    }
`

export default Sidebar
