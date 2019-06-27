import React from 'react'
import { usePageContext } from '../helpers/pageContext'
import { useI18n } from '../i18n/i18nContext'
import { Link } from 'gatsby'

const IntroductionFooter = () => {
    const context = usePageContext()
    const { translate } = useI18n()

    return (
        <div className="PageFooter IntroductionFooter">
            <Link
                className="PageFooter__Link PageFooter__Link--start Button"
                to={`${context.localePath}${context.next.path}`}
            >
                {translate('general.start')} »
            </Link>
        </div>
    )
}

export default IntroductionFooter
