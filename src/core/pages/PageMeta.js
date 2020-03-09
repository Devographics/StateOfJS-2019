import React from 'react'
import Helmet from 'react-helmet'
import { useI18n } from '../i18n/i18nContext'
import { usePageSocialMeta } from '../helpers/pageHelpers'

const PageMeta = ({ overrides = {} }) => {
    const { translate } = useI18n()
    const meta = usePageSocialMeta(translate, overrides)

    return <Helmet meta={meta} />
}

export default PageMeta
