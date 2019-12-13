import { getPageLabel } from '../helpers/pageHelpers'
import { useI18n } from '../i18n/i18nContext'
import { useTools } from '../helpers/toolsContext'

const PageLabel = ({ page, isContextual, includeWebsite }) => {
    const { translate } = useI18n()
    const { getToolName } = useTools()
    return getToolName(page) || getPageLabel(page, translate, { isContextual, includeWebsite })
}

export default PageLabel
