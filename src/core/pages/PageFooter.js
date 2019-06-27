import React from 'react'
import { usePageContext } from '../helpers/pageContext'
import { useI18n } from '../i18n/i18nContext'
import PageLabel from './PageLabel'
import { Link } from 'gatsby'

const PageFooter = () => {
    const context = usePageContext()
    const { translate } = useI18n()

    return (
        <div className="PageFooter">
            {context.previous && (
                <Link
                    className="PageFooter__Link PageFooter__Link--previous"
                    to={`${context.localePath}${context.previous.path}`}
                >
                    « {translate('general.previous')} <PageLabel page={context.previous} />
                </Link>
            )}
            {context.next && (
                <Link
                    className="PageFooter__Link PageFooter__Link--next Button"
                    to={`${context.localePath}${context.next.path}`}
                >
                    {translate('general.next')} <PageLabel page={context.next} /> »
                </Link>
            )}
        </div>
    )
}

export default PageFooter
