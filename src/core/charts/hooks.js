import { useMemo } from 'react'
import ceil from 'lodash/ceil'
import { useI18n } from 'core/i18n/i18nContext'

// const maxTickCount = 8

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

    // const tickCount = Math.min(
    //     maxTickCount,
    //     useMemo(() => {
    //         if (units === 'percentage') return maxValue / 10 + 1
    //         return maxValue / 2000 + 1
    //     }, [maxValue, units])
    // )

    const tickCount = 6

    const ticks = [...Array(tickCount)].map((x, i) => Math.round((i * maxValue) / tickCount))

    return { formatTick, formatValue, maxValue, tickCount, ticks }
}
