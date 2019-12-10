import React, { memo } from 'react'
import PropTypes from 'prop-types'
import theme from 'nivoTheme'
import { ResponsiveScatterPlot } from '@nivo/scatterplot'
import { colors } from 'core/constants.js'
import { useI18n } from 'core/i18n/i18nContext'

const labelPositions = {
    Emotion: [0, -10],
    Tailwind: [0, 10],
    ITCSS: [0, 2],
    SMACSS: [0, -10],
    PureCSS: [0, -10],
    Tachyons: [0, 10],
    // Glamor: [0, 5],
    UIKit: [0, 15]
}
const sectionColors = {
    'CSS Frameworks': colors.purple,
    Methodologies: colors.yellow,
    'CSS-in-JS': colors.greenDark,
    'Pre & Post Processors': colors.red
}

const margins = { top: 20, right: 90, bottom: 70, left: 90 }

const Nodes = props => {
    const { width, height, margin, nodes } = props
    return (
        <g>
            {nodes.map(node => (
                <Node {...node} width={width} height={height} margin={margin} />
            ))}
        </g>
    )
}

const Crosshair = ({ x, y, label, cutoffX = 0, cutoffY = 0 }) => {
    const width = label.length * 8 + 10
    const height = 22
    return (
        <g transform={`translate(${x},${y})`}>
            <g opacity={0.75}>
                <line
                    className="Scatterplot__Node__Crosshair__Line"
                    x1={0}
                    y1={0}
                    x2={-x - cutoffX}
                    y2={-y + cutoffY}
                    stroke={colors.white}
                    strokeWidth={3}
                />
                <rect
                    x={-(width / 2)}
                    y={-height / 2}
                    width={width}
                    height={height}
                    fill={colors.white}
                    rx={3}
                />
            </g>
            <text
                className="Scatterplot__Node__Crosshair__Label"
                fill={colors.navy}
                textAnchor="middle"
                alignmentBaseline="middle"
            >
                {label}
            </text>
        </g>
    )
}
const Node = props => {
    const { data, style, x, y, height, margin } = props
    const { name, formattedX, formattedY } = data
    const yInverted = height - margin.top - margin.bottom - y
    const cutoff = 12 // cut off the lines a little before the node
    const translateLabel = labelPositions[name] || [0, 0]

    return (
        <g className="Scatterplot__Node" transform={`translate(${x},${y})`}>
            <g className="Scatterplot__Node__Crosshairs">
                <circle
                    className="Scatterplot__Node__PointHover"
                    r={12}
                    strokeWidth={3}
                    stroke={colors.white}
                />
                <Crosshair x={0} y={yInverted} label={`${formattedX}`} cutoffY={cutoff} />
                <Crosshair x={-x} y={0} label={`${formattedY}%`} cutoffX={cutoff} />
            </g>

            <circle className="Scatterplot__Node__PointHoverZone" r={16} fill="transparent" />
            <circle className="Scatterplot__Node__Point" r={6} fill={style.color} />

            <g
                className="Scatterplot__Node__Label"
                transform={`translate(${12 + translateLabel[0]},${1 + translateLabel[1]})`}
            >
                <rect
                    className="Scatterplot__Node__Label__Background"
                    x={-6}
                    y={-10}
                    width={name.length * 8 + 9}
                    height={20}
                    fill={colors.white}
                    rx={3}
                />
                <text
                    className="Scatterplot__Node__Label__Text"
                    textAnchor="left"
                    alignmentBaseline="middle"
                    fill={colors.teal}
                >
                    {name}
                </text>
            </g>
        </g>
    )
}
const Quadrants = ({ width, height, margin }) => {
    const { translate } = useI18n()
    const qWidth = (width - margin.right - margin.left) / 2
    const qHeight = (height - margin.top - margin.bottom) / 2

    const quadrants = [
        {
            x: 0,
            y: 0,
            color: colors.navyLight,
            label: translate('quadrants.assess')
        },
        {
            x: qWidth,
            y: 0,
            color: colors.navyLighter,
            label: translate('quadrants.adopt')
        },
        {
            x: 0,
            y: qHeight,
            color: colors.navyDark,
            label: translate('quadrants.avoid')
        },
        {
            x: qWidth,
            y: qHeight,
            color: colors.navyLight,
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

    return (
        <div style={{ height: 600 }}>
            <ResponsiveScatterPlot
                data={data}
                margin={margins}
                xScale={{ type: 'linear', min: 0, max: 10000 }}
                yScale={{ type: 'linear', min: 0, max: 100 }}
                symbolSize={16}
                theme={theme}
                axisTop={null}
                axisRight={null}
                useMesh={false}
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
                layers={[
                    Quadrants,
                    'grid',
                    'axes',
                    Nodes,
                    /*'nodes', */ 'markers',
                    'mesh',
                    'legends'
                ]}
                colors={dot => sectionColors[dot.serieId]}
                animate={false}
                tooltip={({ node }) => {
                    const { data, x, y } = node
                    return (
                        <span>
                            <strong>
                                {data.name} ({data.serieId})
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
                        translateX: -70,
                        translateY: -20,
                        itemWidth: 100,
                        itemHeight: 18,
                        itemsSpacing: 5,
                        itemTextColor: colors.teal,
                        symbolSize: 12,
                        symbolShape: 'circle'
                    }
                ]}
                renderNode={Node}
            />
        </div>
    )
}

ToolsScatterplotChart.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            data: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.string.isRequired,
                    x: PropTypes.number.isRequired,
                    y: PropTypes.number.isRequired
                })
            )
        }).isRequired
    )
}

export default memo(ToolsScatterplotChart)
