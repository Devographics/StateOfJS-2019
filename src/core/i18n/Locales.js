import React from 'react'
import Link from 'core/components/LocaleLink'
import locales from '../../../config/locales.yml'
import { usePageContext } from '../helpers/pageContext'

const Locales = () => {
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
                <div key={locale}>
                    <Link
                        className={`Locales__Item Locales__Item--${isCurrent && 'current'}`}
                        to={link}
                    >
                        {label}
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default Locales
