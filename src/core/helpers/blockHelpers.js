import removeMarkdown from 'remove-markdown'
import { getTranslationValuesFromContext, getPageLabel } from '../helpers/pageHelpers'

export const getBlockTitle = (block, context, translate, { format = 'short', values = {} } = {}) => {
    const { id, title, blockName } = block
    let blockTitle

    const titleValues = {
        values: {
            ...getTranslationValuesFromContext(context, translate),
            ...values
        }
    }

    if (title) {
        blockTitle = title
    } else if (blockName) {
        blockTitle = translate(`block.title.${blockName}`, titleValues)
    } else {
        blockTitle = translate(`block.title.${id}`, titleValues)
    }

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

export const getBlockImage = (block, context, translate) => {
    return `${context.host}/images/captures/${block.id}.png`
    // return `${context.host}/images/captures/${context.basePath &&
    //     context.basePath
    //         .replace(/^\//, '')
    //         .replace(/\/$/, '')
    //         .replace(/\//g, '_')}_${id}.png`
}

export const getBlockMeta = (block, context, translate, title) => {
    const { id } = block
    const link = `${context.host}${context.basePath}${id}`
    const trackingId = `${context.basePath}${id}`.replace(/^\//, '')

    title = title || getBlockTitle(block, context, translate)

    const imageUrl = getBlockImage(block, context, translate)

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
