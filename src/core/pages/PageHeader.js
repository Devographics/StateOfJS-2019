import React from 'react'
import PropTypes from 'prop-types'
import { usePageContext } from '../helpers/pageContext'
import { useI18n } from '../i18n/i18nContext'
import { getPageLabel } from '../helpers/pageHelpers'

const PageHeader = ({ title: titleOverride, showIntro = true, introduction }) => {
    const context = usePageContext()
    const { translate } = useI18n()

    const title = titleOverride || getPageLabel(context, translate)

    return (
        <>
            <h2 className="Page__Title">{title}</h2>
            {showIntro && introduction && (
                <div className="Page__Intro" dangerouslySetInnerHTML={{ __html: introduction }} />
            )}
        </>
    )
}

PageHeader.propTypes = {
    title: PropTypes.string,
    showIntro: PropTypes.bool,
    introduction: PropTypes.node
}

export default PageHeader
