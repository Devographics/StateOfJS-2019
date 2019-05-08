import { getPageLabel } from '../helpers/pageHelpers'
import { useI18n } from '../i18n/i18nContext'

const PageLabel = ({ page, isContextual, includeWebsite }) => {
    const { translate } = useI18n()

    return getPageLabel(page, translate, { isContextual, includeWebsite })
}

export default PageLabel
