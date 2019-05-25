import { useMemo } from 'react'
import { useI18n } from 'core/i18n/i18nContext'

export const useBarFormatters = ({ i18nNamespace, shouldTranslate, units }) => {
    const { translate } = useI18n()

    const formatTick = useMemo(() => {
        if (shouldTranslate !== true) return v => v
        return v => translate(`${i18nNamespace}.${v}.short`)
    }, [translate, shouldTranslate, i18nNamespace])

    const formatValue = useMemo(() => (units === 'percentage' ? v => `${v}%` : '.2s'), [units])

    return { formatTick, formatValue }
}
