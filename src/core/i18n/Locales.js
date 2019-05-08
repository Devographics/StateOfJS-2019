import React from 'react'
import { Link } from 'gatsby'
import locales from '../../../config/locales.yml'
import { usePageContext } from '../helpers/pageContext'

const LangSelector = () => {
    const context = usePageContext()
    const links = locales.map(locale => {
        return {
            ...locale,
            link: `${locale.path === 'default' ? '' : `/${locale.path}`}${context.basePath}`,
            isCurrent: locale.locale === context.locale
        }
    })

    return (
        <div className="Locales">
            {links.map(({ label, locale, link, isCurrent }) => (
                <Link
                    className={`Locales__Item Locales__Item--${isCurrent && 'current'}`}
                    key={locale}
                    to={link}
                >
                    {label}
                </Link>
            ))}
        </div>
    )
}

export default LangSelector
