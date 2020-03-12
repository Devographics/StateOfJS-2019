import React from 'react'
import { usePageContext } from '../helpers/pageContext'
import { useI18n } from '../i18n/i18nContext'
import Debug from '../components/Debug'
import { usePageSocialMeta } from '../helpers/pageHelpers'
import { useTools } from 'core/helpers/toolsContext'
import { websiteTitle } from 'core/constants.js'

const PageMetaDebug = ({ overrides = {} }) => {
    const context = usePageContext()
    const { translate } = useI18n()
    const { getToolName } = useTools()
    const toolName = getToolName(context)
    if (toolName) {
        overrides.title = `${websiteTitle}: ${toolName}`
    }

    const meta = usePageSocialMeta(translate, overrides)
    const metaObject = meta.reduce((acc, meta) => {
        const key = meta.property || meta.name

        return {
            ...acc,
            [key]: meta.content
        }
    }, {})

    if (!context.isDebugEnabled) return null

    return <Debug title="Page meta" data={metaObject} />
}

export default PageMetaDebug
