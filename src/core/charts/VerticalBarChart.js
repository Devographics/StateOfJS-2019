import React, { memo, useMemo } from 'react'
import PropTypes from 'prop-types'
import { ResponsiveBar } from '@nivo/bar'
import { useI18n } from 'core/i18n/i18nContext'
import theme from 'nivoTheme'
import { colors } from '../../constants'

const margin = {
    top: 10,
    right: 56,
    bottom: 50,
    left: 32
}

const Tooltip = memo(({ translate, indexValue, value, data }) => {
    return (
        <div style={{ maxWidth: 300 }}>
            {translate(indexValue)}:&nbsp;<strong>{value}%</strong>&nbsp;({data.count})
        </div>
    )
})

const VerticalBarChart = ({ buckets, i18nNamespace }) => {
    const { translate } = useI18n()

    const [translateShort, translateLong] = useMemo(
        () => [
            rangeKey => translate(`${i18nNamespace}.${rangeKey}.short`),
            rangeKey => translate(`${i18nNamespace}.${rangeKey}.long`)
        ],
        [translate, i18nNamespace]
    )

    const maxValue = useMemo(
        () => Math.ceil(Math.max(...buckets.map(b => b.percentage)) / 10) * 10,
        [buckets]
    )

    return (
        <div style={{ height: 260 }}>
            <ResponsiveBar
                data={buckets}
                indexBy="id"
                keys={['percentage']}
                maxValue={maxValue}
                margin={margin}
                padding={0.4}
                theme={theme}
                colors={[colors.blue]}
                labelFormat={v => `${v}%`}
                labelSkipHeight={16}
                enableGridX={false}
                gridYValues={[maxValue / 10 + 1]}
                enableGridY={true}
                axisLeft={{
                    format: v => `${v}%`,
                    tickValues: maxValue / 10 + 1
                }}
                axisRight={{
                    format: v => `${v}%`,
                    tickValues: maxValue / 10 + 1,
                    legend: translate('users_percentage'),
                    legendPosition: 'middle',
                    legendOffset: 46
                }}
                axisBottom={{
                    format: translateShort,
                    legend: translate(`${i18nNamespace}.axis_legend`),
                    legendPosition: 'middle',
                    legendOffset: 40
                }}
                tooltip={barProps => <Tooltip translate={translateLong} {...barProps} />}
            />
        </div>
    )
}

VerticalBarChart.propTypes = {
    keys: PropTypes.arrayOf(PropTypes.string).isRequired,
    buckets: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            count: PropTypes.number.isRequired,
            percentage: PropTypes.number
        })
    ),
    i18nNamespace: PropTypes.string.isRequired
}

export default memo(VerticalBarChart)
