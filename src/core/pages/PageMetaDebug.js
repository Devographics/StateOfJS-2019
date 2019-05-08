import React from 'react'
import { usePageContext } from '../helpers/pageContext'
import { useI18n } from '../i18n/i18nContext'
import Debug from '../components/Debug'
import { getPageSocialMeta } from '../helpers/pageHelpers'

const PageMetaDebug = ({ overrides = {} }) => {
    const context = usePageContext()
    const { translate } = useI18n()

    if (!context.isDebugEnabled) return null

    const meta = getPageSocialMeta(context, translate, overrides)
    const metaObject = meta.reduce((acc, meta) => {
        const key = meta.property || meta.name

        return {
            ...acc,
            [key]: meta.content
        }
    }, {})

    return <Debug title="Page meta" data={metaObject} />
}

export default PageMetaDebug
