import React, { memo, useMemo } from 'react'
import PropTypes from 'prop-types'
import theme from 'nivoTheme'
import { useI18n } from 'core/i18n/i18nContext'
import { ResponsiveBar } from '@nivo/bar'
import { useTheme } from '@nivo/core'
import { Chip } from '@nivo/tooltip'
import { colors } from '../../constants'

// Define chart patterns
// const patterns = [
//     {
//         id: 'empty',
//         type: 'patternLines',
//         background: 'transparent',
//         color: 'inherit',
//         rotation: -45,
//         lineWidth: 1,
//         spacing: 8
//     }
// ]

// Custom labels using an extra `layer`,
// this way, we can add an extra outline to bar labels
const getLabels = units => ({ bars, getLabelTextColor }) => {
    return bars.map(bar => {

        // skip legend for small bars
        if (bar.width < 60) return null

        // only keep 1 decimal
        let value = Math.round(bar.data.value * 10) / 10

        if (units === 'percentage') value = `${value}%`

        // `pointerEvents: none` is used to not
        // disturb mouse events
        return (
            <g
                key={bar.key}
                transform={`translate(${bar.x + bar.width / 2},${bar.y + bar.height / 2})`}
                style={{ pointerEvents: 'none' }}
            >
                <text
                    textAnchor="middle"
                    dominantBaseline="middle"
                    style={{
                        strokeWidth: 4,
                        stroke: '#232840',
                        strokeLinejoin: 'round',
                        fontSize: 13,
                        fontWeight: 600
                    }}
                >
                    {value}
                </text>
                <text
                    textAnchor="middle"
                    dominantBaseline="middle"
                    style={{
                        fill: colors.greyLight,
                        fontSize: 13,
                        fontWeight: 600
                    }}
                >
                    {value}
                </text>
            </g>
        )
    })
}

const Tooltip = memo(({ translate, i18nNamespace, bar, units }) => {
    const theme = useTheme()

    return (
        <div style={theme.tooltip.basic}>
            <Chip color={bar.color} style={{ marginRight: 7 }} />
            {translate(`${i18nNamespace}.${bar.id}`)}:{' '}
            <strong>{bar.data[`${bar.id}_${units}`]}{units === 'percentage' && '%'}</strong>
        </div>
    )
})

const GaugeBarChart = ({ buckets, mapping, units, applyEmptyPatternTo, i18nNamespace }) => {
    const { translate } = useI18n()

    const keys = useMemo(() => mapping.map(m => m.id), [mapping])
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
        const colorById = mapping.reduce(
            (acc, m) => ({
                ...acc,
                [m.id]: m.color
            }),
            {}
        )

        return bar => colorById[bar.id]
    }, [mapping])
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
            theme={theme}
            layers={['bars', labelsLayer]}
            // defs={patterns}
            fill={patternRules}
            tooltip={bar => (
                <Tooltip bar={bar} translate={translate} i18nNamespace={i18nNamespace} units={units}/>
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
    mapping: PropTypes.arrayOf(
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
