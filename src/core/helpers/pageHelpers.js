import { getToolName } from '../helpers/tools'

const WEBSITE_TITLE = 'The State of JavaScript 2019'

export const getTranslationValuesFromContext = (context, translate) => {
    const values = {}
    if (context.section !== undefined) {
        values.section = translate(`section.${context.section}`)
    }
    if (context.tool !== undefined) {
        values.tool = getToolName(context.tool, translate)
    }

    return values
}

export const getPageLabel = (
    page,
    translate,
    { isContextual = false, includeWebsite = false } = {}
) => {
    let label

    if (['features_intro', 'features_results', 'features_conclusion'].includes(page.type)) {
        label = translate(
            `page.${page.type}.${isContextual === true ? 'contextual_label' : 'label'}`,
            {
                values: {
                    section: translate(`features.${page.data.section}`)
                }
            }
        )
    } else {
        label = translate(`page.${page.id}`)
    }

    if (includeWebsite === true) {
        label = `${WEBSITE_TITLE}: ${label}`
    }

    return label
}

/**
 * example:
 *   http://2018.stateofjs.com/images/captures/front-end_overview.png
 */
export const getPageImageUrl = context => {
    const baseUrl = `${context.host}/images/`

    let imageUrl
    if (context.block !== undefined) {
        imageUrl = `${baseUrl}captures/${context.basePath
            .replace(/^\//, '')
            .replace(/\/$/, '')
            .replace(/\//g, '_')}_${context.block}.png`
    } else {
        imageUrl = `${baseUrl}stateofjs_socialmedia.png`
    }

    return imageUrl
}

export const getPageMeta = (context, translate, overrides = {}) => {
    const url = `${context.host}${context.localePath}${context.basePath}`
    const imageUrl = getPageImageUrl(context)
    const isRoot = context.path === '/' || context.basePath === '/'

    const meta = {
        url,
        title: isRoot ? WEBSITE_TITLE : getPageLabel(context, translate, { includeWebsite: true }),
        imageUrl,
        ...overrides
    }

    return meta
}

export const getPageSocialMeta = (context, translate, overrides = {}) => {
    const meta = getPageMeta(context, translate, overrides)

    const socialMeta = [
        // facebook
        { property: 'og:type', content: 'article' },
        { property: 'og:url', content: meta.url },
        { property: 'og:image', content: meta.imageUrl },
        { property: 'og:title', content: meta.title },
        { property: 'og:description', content: meta.description },
        // twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image:src', content: meta.imageUrl },
        { name: 'twitter:title', content: meta.title },
        { name: 'twitter:description', content: meta.description }
    ]

    return socialMeta.filter(({ content }) => content !== undefined)
}

/**
 * Merge context generated from `gatsby-node` with runtime context.
 */
export const mergePageContext = (pageContext, location, state) => {
    const isCapturing =
        location && location.search ? location.search.indexOf('capture') !== -1 : false
    const isDebugEnabled =
        location && location.search ? location.search.indexOf('debug') !== -1 : false

    let host = 'https://2019.stateofcss.com'
    if (location && location.host && location.protocol) {
        host = `${location.protocol}//${location.host}`
    }

    return {
        ...pageContext,
        host,
        currentPath: location ? location.pathname : undefined,
        isCapturing,
        isDebugEnabled,
        ...state
    }
}
