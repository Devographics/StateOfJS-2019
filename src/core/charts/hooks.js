import { useMemo } from 'react'
import ceil from 'lodash/ceil'
import { useI18n } from 'core/i18n/i18nContext'

export const useBarChart = ({ buckets, total, mode, units, i18nNamespace, shouldTranslate }) => {
    const { translate } = useI18n()

    const formatTick = useMemo(() => {
        if (shouldTranslate !== true) return v => v
        return v => translate(`${i18nNamespace}.${v}.short`)
    }, [translate, shouldTranslate, i18nNamespace])

    const formatValue = useMemo(() => (units === 'percentage' ? v => `${v}%` : '.2s'), [units])

    const maxValue = useMemo(() => {
        if (units === 'percentage') {
            if (mode === 'absolute') return 100
            return ceil(Math.max(...buckets.map(b => b.percentage)), -1)
        }

        if (mode === 'absolute') return ceil(total, -3)
        return ceil(Math.max(...buckets.map(b => b.count)), -3)
    }, [buckets, total, mode, units])

    const tickCount = useMemo(() => {
        if (units === 'percentage') return maxValue / 10 + 1
        return maxValue / 2000 + 1
    }, [maxValue, units])

    return { formatTick, formatValue, maxValue, tickCount }
}
