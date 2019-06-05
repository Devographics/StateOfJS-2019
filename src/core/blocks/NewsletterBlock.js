import React from 'react'
import Newsletter from '../components/Newsletter'
import { useI18n } from '../i18n/i18nContext'

const NewsletterBlock = () => {
    const { translate } = useI18n()

    return (
        <div className="Block Block--Newsletter Newsletter">
            <h3 className="Newsletter__Heading">{translate('general.stay_tuned')}</h3>
            <div className="Newsletter__Description">{translate('general.leave_your_email')}</div>
            <Newsletter />
        </div>
    )
}

export default NewsletterBlock
