import React, { memo, useMemo, useContext } from 'react'
import PropTypes from 'prop-types'
import { ThemeContext } from 'styled-components'
import { useI18n } from 'core/i18n/i18nContext'
import { ResponsiveBar } from '@nivo/bar'
import { useTheme } from '@nivo/core'
import { Chip } from '@nivo/tooltip'
import ChartLabel from 'core/components/ChartLabel'

// Custom labels using an extra `layer`,
// this way, we can add an extra outline to bar labels
const getLabels = units => ({ bars }) => {
    return bars.map(bar => {
        // skip legend for small bars
        if (bar.width < 60) return null

        // only keep 1 decimal
        let value = Math.round(bar.data.value * 10) / 10

        if (units === 'percentage') value = `${value}%`

        // `pointerEvents: none` is used to not
        // disturb mouse events
        return (
            <ChartLabel
                key={bar.key}
                label={value}
                transform={`translate(${bar.x + bar.width / 2},${bar.y + bar.height / 2})`}
                style={{ pointerEvents: 'none' }}
            />
        )
    })
}

const Tooltip = memo(({ translate, i18nNamespace, bar, units }) => {
    const theme = useTheme()

    return (
        <div style={theme.tooltip.basic}>
            <Chip color={bar.color} style={{ marginRight: 7 }} />
            {translate(`${i18nNamespace}.${bar.id}`)}:{' '}
            <strong>
                {bar.data[`${bar.id}_${units}`]}
                {units === 'percentage' && '%'}
            </strong>
        </div>
    )
})

const GaugeBarChart = ({ buckets, colorMapping, units, applyEmptyPatternTo, i18nNamespace }) => {
    const { translate } = useI18n()
    const theme = useContext(ThemeContext)

    const keys = useMemo(() => colorMapping.map(m => m.id), [colorMapping])
    const data = useMemo(
        () => [
            buckets.reduce((acc, bucket) => {
                return {
                    ...acc,
                    [bucket.id]: bucket[units],
                    [`${bucket.id}_count`]: bucket.count,
                    [`${bucket.id}_percentage`]: bucket.percentage
                }
            }, {})
        ],
        [buckets, units]
    )

    const colors = useMemo(() => {
        const colorById = colorMapping.reduce(
            (acc, m) => ({
                ...acc,
                [m.id]: m.color
            }),
            {}
        )

        return bar => colorById[bar.id]
    }, [colorMapping])
    const labelsLayer = useMemo(() => getLabels(units), [units])
    const patternRules = useMemo(
        () => [
            {
                id: 'empty',
                match: { id: applyEmptyPatternTo }
            }
        ],
        [applyEmptyPatternTo]
    )

    return (
        <ResponsiveBar
            data={data}
            keys={keys}
            layout="horizontal"
            indexBy={() => 'serie'}
            colors={colors}
            enableLabel={false}
            labelTextColor={{
                from: 'color',
                modifiers: [['brighter', 1.4]]
            }}
            axisLeft={null}
            axisBottom={null}
            enableGridX={false}
            enableGridY={false}
            animate={false}
            theme={theme.charts}
            layers={['bars', labelsLayer]}
            defs={[theme.charts.emptyPattern]}
            fill={patternRules}
            tooltip={bar => (
                <Tooltip
                    bar={bar}
                    translate={translate}
                    i18nNamespace={i18nNamespace}
                    units={units}
                />
            )}
        />
    )
}

GaugeBarChart.propTypes = {
    buckets: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            count: PropTypes.number.isRequired,
            percentage: PropTypes.number.isRequired
        }).isRequired
    ).isRequired,
    colorMapping: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            color: PropTypes.string.isRequired
        })
    ).isRequired,
    units: PropTypes.oneOf(['count', 'percentage']),
    applyEmptyPatternTo: PropTypes.string,
    i18nNamespace: PropTypes.string.isRequired
}

export default GaugeBarChart
