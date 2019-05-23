import React, { memo, useMemo } from 'react'
// import PropTypes from 'prop-types'
import { ResponsiveBar } from '@nivo/bar'
import theme from 'nivoTheme'
import { colors } from '../../constants'

const getLabels = mode => ({ bars }) => {
    return bars.map(bar => {
        if (bar.key.includes('not_used')) {
            return null
        }
        // only keep 2 decimal
        let value = Math.round(bar.data.value * 100)

        if (mode === 'percentage') value = `${value}%`

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

const RatioChart = ({ buckets, mode = 'percentage' }) => {
    const labelsLayer = useMemo(() => getLabels(mode), [mode])

    return (
        <div style={{ height: buckets.length * 30 + 80 }}>
            <ResponsiveBar
                layout="horizontal"
                margin={{
                    top: 0,
                    right: 160,
                    bottom: 0,
                    left: 160
                }}
                indexBy="id"
                keys={['not_used1', 'used', 'not_used2']}
                data={buckets}
                theme={theme}
                enableGridX={true}
                enableGridY={false}
                enableLabel={false}
                colors={[colors.teal, colors.blue, colors.teal]}
                padding={0.5}
                // axisTop={{
                //     format: '.2s'
                // }}
                axisBottom={null}
                axisLeft={{
                    tickSize: 0,
                    tickPadding: 10
                }}
                axisRight={{
                    tickSize: 0,
                    tickPadding: 10
                }}
                // labelFormat={x =>{console.log(x); return 'foo'}}
                // tooltip={barProps => <Tooltip {...barProps} />}

                layers={['grid', 'axes', 'bars', 'markers', 'legends', labelsLayer]}
            />
        </div>
    )
}

// RatioChart.propTypes = {
//     buckets: PropTypes.arrayOf(
//         PropTypes.shape({
//             id: PropTypes.string.isRequired,
//             counts: PropTypes.number.isRequired,
//             percentages: PropTypes.number
//         })
//     )
// }

export default memo(RatioChart)
