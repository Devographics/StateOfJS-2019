import React from 'react'
import Helmet from 'react-helmet'
import { usePageContext } from '../helpers/pageContext'
import { getPageSocialMeta, getPageMeta } from '../helpers/pageHelpers'
import { useI18n } from '../i18n/i18nContext'

const Head = () => {
    const context = usePageContext()
    const { translate } = useI18n()

    const meta = getPageMeta(context, translate)
    const socialMeta = getPageSocialMeta(context, translate)
    const description = translate(`meta.description`)

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
