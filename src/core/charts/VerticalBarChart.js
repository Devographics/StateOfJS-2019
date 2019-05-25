import React, { memo, useMemo } from 'react'
import PropTypes from 'prop-types'
import { ResponsiveBar } from '@nivo/bar'
import { useI18n } from 'core/i18n/i18nContext'
import theme from 'nivoTheme'
import { colors } from '../../constants'
import { useBarFormatters } from './hooks'
import BarTooltip from './BarTooltip'

const margin = {
    top: 10,
    right: 70,
    bottom: 50,
    left: 60
}

const VerticalBarChart = ({ buckets, i18nNamespace, translateData, units }) => {
    const { translate } = useI18n()
    const { formatTick, formatValue } = useBarFormatters({
        i18nNamespace,
        shouldTranslate: translateData,
        units
    })
    const maxValue = useMemo(
        () => Math.ceil(Math.max(...buckets.map(b => b.percentage)) / 10) * 10,
        [buckets]
    )

    return (
        <div style={{ height: 260 }}>
            <ResponsiveBar
                data={buckets}
                indexBy="id"
                keys={[units]}
                // maxValue={maxValue}
                margin={margin}
                padding={0.4}
                theme={theme}
                colors={[colors.blue]}
                labelFormat={formatValue}
                labelSkipHeight={16}
                enableGridX={false}
                gridYValues={maxValue / 10 + 1}
                enableGridY={true}
                axisLeft={{
                    format: formatValue,
                    tickValues: maxValue / 10 + 1
                }}
                axisRight={{
                    format: formatValue,
                    tickValues: maxValue / 10 + 1,
                    legend: translate(`users_${units}`),
                    legendPosition: 'middle',
                    legendOffset: 52
                }}
                axisBottom={{
                    format: formatTick,
                    legend: translate(`${i18nNamespace}.axis_legend`),
                    legendPosition: 'middle',
                    legendOffset: 40
                }}
                tooltip={barProps => (
                    <BarTooltip
                        i18nNamespace={i18nNamespace}
                        shouldTranslate={translateData}
                        {...barProps}
                    />
                )}
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
    ).isRequired,
    i18nNamespace: PropTypes.string.isRequired,
    translateData: PropTypes.bool.isRequired,
    units: PropTypes.oneOf(['percentage', 'count']).isRequired
}
VerticalBarChart.defaultProps = {
    translateData: true
}

export default memo(VerticalBarChart)
