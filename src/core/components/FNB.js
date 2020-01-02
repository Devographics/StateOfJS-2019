import React from 'react'
import ReactMarkdown from 'react-markdown'
import { useI18n } from 'core/i18n/i18nContext'

const FNB = () => {
    const { translate } = useI18n()
    return (
        <div className="FNB">
            <ReactMarkdown source={translate('fnb')} />
        </div>
    )
}

export default FNB
