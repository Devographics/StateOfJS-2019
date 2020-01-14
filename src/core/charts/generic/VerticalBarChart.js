import React, { memo, useMemo } from 'react'
import PropTypes from 'prop-types'
import { ResponsiveBar } from '@nivo/bar'
import { useI18n } from 'core/i18n/i18nContext'
import theme from 'nivoTheme'
import { getColor } from 'core/constants'
import { useBarChart } from 'core/charts/hooks'
import BarTooltip from './BarTooltip'
import ChartLabel from 'core/components/ChartLabel'

const breakpoint = 600

const getMargins = viewportWidth => ({
    top: 10,
    right: 70,
    bottom: viewportWidth < breakpoint ? 110 : 60,
    left: 60
})

const getLabelsLayer = units => props => {
    // adjust settings according to dimensions
    let fontSize = 13
    let rotation = 0
    if (props.width < 600) {
        fontSize = 11
        rotation = -90
    }

    return props.bars.map(bar => {
        const label = units === 'percentage' ? `${bar.data.value}%` : bar.data.value

        return (
            <ChartLabel
                key={bar.key}
                label={label}
                transform={`translate(${bar.x + bar.width / 2},${bar.y +
                    bar.height / 2}) rotate(${rotation})`}
                fontSize={fontSize}
                style={{
                    pointerEvents: 'none'
                }}
            />
        )
    })
}

const VerticalBarChart = ({
    viewportWidth,
    className,
    buckets,
    total,
    i18nNamespace,
    translateData,
    mode,
    units,
    chartProps
}) => {
    const { translate } = useI18n()

    const { formatTick, formatValue, maxValue, ticks } = useBarChart({
        buckets,
        total,
        i18nNamespace,
        shouldTranslate: translateData,
        mode,
        units
    })

    const labelsLayer = useMemo(() => getLabelsLayer(units), [units])

    return (
        <div style={{ height: 260 }} className={`VerticalBarChart ${className}`}>
            <ResponsiveBar
                data={buckets}
                indexBy="id"
                keys={[units]}
                maxValue={maxValue}
                margin={getMargins(viewportWidth)}
                padding={0.4}
                theme={theme}
                animate={false}
                colors={[getColor('bar')]}
                borderRadius={1}
                enableLabel={false}
                enableGridX={false}
                gridYValues={ticks}
                enableGridY={true}
                axisLeft={{
                    format: formatValue,
                    tickValues: ticks
                }}
                axisRight={{
                    format: formatValue,
                    tickValues: ticks,
                    legend: translate(`users_${units}`),
                    legendPosition: 'middle',
                    legendOffset: 52
                }}
                axisBottom={{
                    format: formatTick,
                    legend: translate(`${i18nNamespace}.axis_legend`),
                    legendPosition: 'middle',
                    legendOffset: viewportWidth < breakpoint ? 90 : 50,
                    tickRotation: viewportWidth < breakpoint ? -45 : 0
                }}
                tooltip={barProps => (
                    <BarTooltip
                        i18nNamespace={i18nNamespace}
                        shouldTranslate={translateData}
                        {...barProps}
                    />
                )}
                layers={['grid', 'axes', 'bars', labelsLayer]}
                {...chartProps}
            />
        </div>
    )
}

VerticalBarChart.propTypes = {
    total: PropTypes.number.isRequired,
    buckets: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
            count: PropTypes.number.isRequired,
            percentage: PropTypes.number
        })
    ).isRequired,
    i18nNamespace: PropTypes.string.isRequired,
    translateData: PropTypes.bool.isRequired,
    mode: PropTypes.oneOf(['absolute', 'relative']).isRequired,
    units: PropTypes.oneOf(['percentage', 'count']).isRequired
}
VerticalBarChart.defaultProps = {
    translateData: true
}

export default memo(VerticalBarChart)
