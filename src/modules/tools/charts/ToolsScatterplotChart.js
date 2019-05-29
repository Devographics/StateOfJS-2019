import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { ResponsiveBubble } from '@nivo/circle-packing'
import theme from 'nivoTheme'
import { ResponsiveScatterPlot } from '@nivo/scatterplot'
import { colors } from '../../../constants'
import { useI18n } from 'core/i18n/i18nContext'
import { useEntities } from 'core/entities/entitiesContext'

const Quadrants = ({ width, height }) => {
    const { translate } = useI18n()
    const qWidth = width / 2
    const qHeight = height / 2

    const quadrants = [
        {
            x: 0,
            y: 0,
            color: colors.backgroundLight,
            label: translate('quadrants.assess')
        },
        {
            x: qWidth,
            y: 0,
            color: colors.backgroundLighter,
            label: translate('quadrants.adopt')
        },
        {
            x: 0,
            y: qHeight,
            color: colors.backgroundDark,
            label: translate('quadrants.avoid')
        },
        {
            x: qWidth,
            y: qHeight,
            color: colors.backgroundLight,
            label: translate('quadrants.analyze')
        }
    ]
    return (
        <g className="Quadrant__Background">
            {quadrants.map(({ x, y, color, label }) => (
                <g key={label}>
                    <rect x={x} y={y} width={qWidth} height={qHeight} fill={color} />
                    <text
                        className="Quadrant__Label"
                        x={x + qWidth / 2}
                        y={y + qHeight / 2}
                        textAnchor="middle"
                        alignmentBaseline="central"
                    >
                        {label}
                    </text>
                </g>
            ))}
        </g>
    )
}

const ToolsScatterplotChart = ({ data }) => {
    const { translate } = useI18n()
    const { getName } = useEntities()

    return (
        <div style={{ height: 600 }}>
            <ResponsiveScatterPlot
                data={data}
                margin={{ top: 20, right: 90, bottom: 70, left: 90 }}
                xScale={{ type: 'linear', min: 0, max: 10000 }}
                yScale={{ type: 'linear', min: 0, max: 100 }}
                symbolSize={16}
                theme={theme}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    orient: 'bottom',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: translate('users_count'),
                    legendPosition: 'middle',
                    legendOffset: 46
                }}
                axisLeft={{
                    orient: 'left',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: translate('satisfaction_percentage'),
                    legendPosition: 'middle',
                    legendOffset: -60,
                    format: s => `${s}%`
                }}
                layers={[Quadrants, 'grid', 'axes', 'points', 'markers', 'mesh', 'legends']}
                colors={dot => dot.serie.color}
                animate={false}
                tooltip={({ id, serie, x, y, color }) => {
                    const dot = serie.data.find(d => d.data.x === x)
                    const dotId = dot && dot.data && dot.data.id
                    return (
                        <span>
                            <strong>
                                {getName(dotId)} ({translate(`page.${serie.id}`)})
                            </strong>
                            :{' '}
                            {`${x} ${translate('users')},  ${y}${translate(
                                'percent_satisfaction'
                            )}`}
                        </span>
                    )
                }}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        translateX: -60,
                        translateY: -10,
                        itemWidth: 100,
                        itemHeight: 18,
                        itemsSpacing: 5,
                        itemTextColor: colors.teal,
                        symbolSize: 12,
                        symbolShape: 'circle'
                    }
                ]}
            />
        </div>
    )
}

// ToolsScatterplotChart.propTypes = {
//     data: PropTypes.shape({
//         id: PropTypes.string.isRequired,
//         data: PropTypes.arrayOf(
//             PropTypes.shape({
//                 id: PropTypes.string.isRequired,
//                 x: PropTypes.number.isRequired,
//                 y: PropTypes.number.isRequired
//             })
//         )
//     }).isRequired
// }

export default memo(ToolsScatterplotChart)
