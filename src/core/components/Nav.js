import React from 'react'
import sitemap from '../../../config/sitemap.yml'
import { usePageContext } from '../helpers/pageContext'
import PageLink from '../pages/PageLink'
import PageLabel from '../pages/PageLabel'
import LanguageSwitcher from '../i18n/LanguageSwitcher'

const filteredNav = sitemap.filter(page => !page.is_hidden)

const NavItem = ({ page, currentPath, closeSidebar, level = 0 }) => {
    const isActive = currentPath.indexOf(page.path) !== -1
    const hasChildren = page.children && page.children.length > 0
    const displayChildren = hasChildren > 0 && isActive

    return (
        <>
            <div
                className={`Nav__Page Nav__Page--lvl-${level} Nav__Page--${
                    displayChildren ? 'showChildren' : 'hideChildren'
                }`}
            >
                <PageLink
                    className={`Nav__Page__Link`}
                    activeClassName="Nav__Page__Link--active"
                    onClick={closeSidebar}
                    page={page}
                >
                    <PageLabel page={page} />
                </PageLink>
                {hasChildren && (
                    <div className={`Nav__SubPages Nav__SubPages--lvl-${level}`}>
                        {page.children.map(childPage => (
                            <NavItem
                                key={childPage.id}
                                page={childPage}
                                closeSidebar={closeSidebar}
                                currentPath={currentPath}
                                level={level + 1}
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
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
                    page={page}
                    currentPath={context.currentPath}
                    closeSidebar={closeSidebar}
                />
            ))}
        </div>
    )
}

export default Nav
