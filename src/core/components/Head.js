import React from 'react'
import Helmet from 'react-helmet'
import { usePageContext } from 'core/helpers/pageContext'
import { getPageSocialMeta, getPageMeta } from 'core/helpers/pageHelpers'
import { useI18n } from 'core/i18n/i18nContext'
import { useTools } from 'core/helpers/toolsContext'
import { websiteTitle } from 'core/constants.js'

const Head = () => {
    const context = usePageContext()
    const { translate } = useI18n()
    const { getToolName } = useTools()

    let overrides = {}
    const toolName = getToolName(context)
    if (toolName) {
        overrides.title = `${websiteTitle}: ${toolName}`
    }

    const meta = getPageMeta(context, translate, overrides)
    const socialMeta = getPageSocialMeta(context, translate, overrides)
    const description = translate(`general.description`)

    const mergedMeta = [
        { charset: 'utf-8' },
        { name: 'description', content: description },
        // responsive
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        // google check
        {
            name: 'google-site-verification',
            content: 'hrTRsz9fkGmQlVbLBWA4wmhn0qsI6_M3NKemTGCkpps'
        },
        // social
        ...socialMeta
    ]

    return (
        <>
            <Helmet meta={mergedMeta} defaultTitle={meta.fullTitle}>
                <html lang="en" />
                <title>{meta.title}</title>
                <link rel="shortcut icon" href="/images/favicon.png" />
                <link rel="preconnect" href="https://fonts.gstatic.com/" crossOrigin />
                <link
                    href="https://fonts.googleapis.com/css?family=IBM+Plex+Mono:300,300i,600"
                    rel="stylesheet"
                />
            </Helmet>
        </>
    )
}

export default Head
