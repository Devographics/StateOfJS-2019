import removeMarkdown from 'remove-markdown'
import { getTranslationValuesFromContext, getPageLabel } from '../helpers/pageHelpers'

export const getBlockTitle = (id, context, translate, { format = 'short', values = {} } = {}) => {
    let blockTitle = translate(`block.title.${id}`, {
        values: {
            ...getTranslationValuesFromContext(context, translate),
            ...values
        }
    })

    if (format === 'full') {
        const pageLabel = getPageLabel(context, translate)
        blockTitle = `${pageLabel} - ${blockTitle}`
    }

    return blockTitle
}

export const getBlockDescription = (
    id,
    context,
    translate,
    { isMarkdownEnabled = true, values = {} } = {}
) => {
    let description = translate(`block.description.${id}`, {
        values: {
            ...getTranslationValuesFromContext(context, translate),
            ...values
        }
    })
    if (isMarkdownEnabled !== true) {
        description = removeMarkdown(description)
    }

    return description
}

export const getBlockImage = (id, context, translate) => {
    return `${context.host}/images/captures/${id}.png`
    // return `${context.host}/images/captures/${context.basePath &&
    //     context.basePath
    //         .replace(/^\//, '')
    //         .replace(/\/$/, '')
    //         .replace(/\//g, '_')}_${id}.png`
}

export const getBlockMeta = (id, context, translate, title) => {
    const link = `${context.host}${context.basePath}${id}`
    const trackingId = `${context.basePath}${id}`.replace(/^\//, '')
    title = title || getBlockTitle(id, context, translate)

    const imageUrl = getBlockImage(id, context, translate)
    console.log(imageUrl)
    const twitterText = translate('share.block.twitter_text', {
        values: {
            title,
            link
        }
    })

    const emailSubject = translate('share.block.subject')
    const emailBody = translate('share.block.body', {
        values: {
            title,
            link
        }
    })

    return {
        link,
        trackingId,
        title,
        twitterText,
        emailSubject,
        emailBody,
        imageUrl
    }
}
