import React from 'react'
import styled from 'styled-components'
import sitemap from '../../../config/sitemap.yml'
import { usePageContext } from '../helpers/pageContext'
import PageLabel from '../pages/PageLabel'
import LanguageSwitcher from '../i18n/LanguageSwitcher'
import LocaleLink from './LocaleLink'

const filteredNav = sitemap.filter(page => !page.is_hidden)

const getPagePath = path => (path === '/' ? '/' : path.replace(/\/$/, ''))

const StyledLink = styled.a`
    display: inline-block;
    white-space: nowrap;
    margin: 0 0 ${props => props.theme.spacing / 3}px 0;
    font-size: ${props => props.theme.typography.sizes.medium};

    &,
    &:link,
    &:visited,
    &:active,
    &:focus {
        color: ${props => {
            if (props.level === 0) {
                return props.theme.colors.link
            }

            return props.theme.colors.text
        }};
    }

    &._is-active {
        font-weight: ${props => (props.level === 0 ? undefined : 400)};
        color: ${props => {
            if (props.level !== 0) {
                return props.theme.colors.linkActive
            }

            return props.theme.colors.link
        }};
    }
`

const NavItem = ({ page, currentPath, closeSidebar, level = 0 }) => {
    const isActive = currentPath === page.path
    const hasChildren = page.children && page.children.length > 0
    const displayChildren = hasChildren > 0 && isActive

    return (
        <div
            className={`Nav__Page Nav__Page--lvl-${level} Nav__Page--${
                displayChildren ? 'showChildren' : 'hideChildren'
            }`}
        >
            <LocaleLink to={page.path}>
                <StyledLink
                    className={`Nav__Page__Link${isActive ? ' _is-active' : ''}`}
                    onClick={closeSidebar}
                    level={level}
                >
                    <span>
                        <PageLabel page={page} />
                    </span>
                </StyledLink>
            </LocaleLink>
            {hasChildren && (
                <div className={`Nav__SubPages Nav__SubPages--lvl-${level}`}>
                    {page.children.map(childPage => (
                        <NavItem
                            key={childPage.id}
                            page={{ ...childPage, path: getPagePath(childPage.path) }}
                            closeSidebar={closeSidebar}
                            currentPath={currentPath}
                            level={level + 1}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

const Nav = ({ closeSidebar }) => {
    const context = usePageContext()

    return (
        <div className="Nav">
            <LanguageSwitcher />
            {filteredNav.map((page, i) => (
                <NavItem
                    key={i}
                    page={{ ...page, path: getPagePath(page.path) }}
                    currentPath={context.currentPath}
                    closeSidebar={closeSidebar}
                />
            ))}
        </div>
    )
}

export default Nav
