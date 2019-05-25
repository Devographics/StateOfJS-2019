import { useMemo } from 'react'
import { useI18n } from 'core/i18n/i18nContext'

export const useBarFormatters = ({ i18nNamespace, shouldTranslate, mode }) => {
    const { translate } = useI18n()

    const formatTick = useMemo(() => {
        if (shouldTranslate !== true) return v => v
        return v => translate(`${i18nNamespace}.${v}.short`)
    }, [translate, shouldTranslate, i18nNamespace])

    const formatValue = useMemo(() => (mode === 'percentage' ? v => `${v}%` : '.2s'), [mode])

    return { formatTick, formatValue }
}
