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
    block,
    context,
    translate,
    { isMarkdownEnabled = true, values = {} } = {}
) => {
    const { id, description, blockName } = block
    let blockDescription

    const descriptionValues = {
        values: {
            ...getTranslationValuesFromContext(context, translate),
            ...values
        }
    }

    if (description) {
        blockDescription = description
    } else if (blockName) {
        blockDescription = translate(`block.description.${blockName}`, descriptionValues)
    } else {
        blockDescription = translate(`block.description.${id}`, descriptionValues)
    }

    if (isMarkdownEnabled !== true) {
        blockDescription = removeMarkdown(blockDescription)
    }

    return blockDescription
}

export const getBlockImage = (block, context, translate) => {
    return `${context.host}/images/captures/${block.id}.png`
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
