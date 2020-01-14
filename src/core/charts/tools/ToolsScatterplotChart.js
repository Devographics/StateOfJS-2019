import React, { memo } from 'react'
import PropTypes from 'prop-types'
import theme from 'nivoTheme'
import { ResponsiveScatterPlot } from '@nivo/scatterplot'
import { colors, getColor, totalCountRounded } from 'core/constants.js'
import { useI18n } from 'core/i18n/i18nContext'

const labelPositions = {
    satisfaction: {
        Feathers: [0, 5],
        Puppeteer: [0, 5],
        Svelte: [0, 10],
        Gatsby: [-70, 0],
        Cypress: [0, -10],
        'Next.js': [0, -10]
    },
    interest: {
        Jasmine: [-80, 0],
        PureScript: [0, -10],
        Sails: [-60, 0],
        'Next.js': [-80, 0]
    }
}

const margins = { top: 20, right: 90, bottom: 70, left: 90 }

const Nodes = props => {
    const { width, height, margin, nodes, current, metric } = props
    return (
        <g>
            {nodes.map((node, i) => (
                <Node
                    key={i}
                    {...node}
                    width={width}
                    height={height}
                    margin={margin}
                    current={current}
                    metric={metric}
                />
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
    const { id, data, style, x, y, height, margin, current, metric } = props
    const { name, formattedX, formattedY } = data
    const yInverted = height - margin.top - margin.bottom - y
    const cutoff = 12 // cut off the lines a little before the node
    const translateLabel = labelPositions[metric][name] || [0, 0]
    const category = id.split('.')[0]
    const opacity = current !== null && current !== category ? 0.3 : 1
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
            <circle
                className="Scatterplot__Node__Point"
                r={6}
                fill={style.color}
                opacity={opacity}
            />

            <g
                className="Scatterplot__Node__Label"
                transform={`translate(${12 + translateLabel[0]},${1 + translateLabel[1]})`}
                opacity={opacity}
            >
                <rect
                    className="Scatterplot__Node__Label__Background"
                    x={-6}
                    y={-10}
                    width={name && name.length * 8 + 9}
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

const quadrantLabels = {
    satisfaction: ['assess', 'adopt', 'avoid', 'analyze'],
    interest: ['mainstream', 'next_big_thing', 'unknown', 'low_interest']
}

const Quadrants = ({ width, height, margin, metric = 'satisfaction' }) => {
    const { translate } = useI18n()
    const qWidth = (width - margin.right - margin.left) / 2
    const qHeight = (height - margin.top - margin.bottom) / 2

    const quadrants = [
        {
            x: 0,
            y: 0,
            color: colors.navyLight,
            label: translate(`quadrants.${quadrantLabels[metric][0]}`)
        },
        {
            x: qWidth,
            y: 0,
            color: colors.navyLighter,
            label: translate(`quadrants.${quadrantLabels[metric][1]}`)
        },
        {
            x: 0,
            y: qHeight,
            color: colors.navyDark,
            label: translate(`quadrants.${quadrantLabels[metric][2]}`)
        },
        {
            x: qWidth,
            y: qHeight,
            color: colors.navyLight,
            label: translate(`quadrants.${quadrantLabels[metric][3]}`)
        }
    ]

    return (
        <g className="Quadrant__Background">
            {quadrants.map(({ x, y, color, label }) => (
                <g key={label}>
                    <rect x={x} y={y} width={qWidth} height={qHeight} fill={color} />
                    {metric === 'satisfaction' && (
                        <text
                            className="Quadrant__Label"
                            x={x + qWidth / 2}
                            y={y + qHeight / 2}
                            textAnchor="middle"
                            alignmentBaseline="central"
                        >
                            {label}
                        </text>
                    )}
                </g>
            ))}
        </g>
    )
}

const ToolsScatterplotChart = ({ data, metric = 'satisfaction', current }) => {
    const { translate } = useI18n()

    const quadrants = [
        props => <Quadrants {...props} metric={metric} />,
        'grid',
        'axes',
        props => <Nodes {...props} current={current} metric={metric} />,
        /*'nodes', */ 'markers',
        'mesh',
        'legends'
    ]

    return (
        <div style={{ height: 600 }}>
            <ResponsiveScatterPlot
                data={data}
                margin={margins}
                xScale={{ type: 'linear', min: 0, max: totalCountRounded }}
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
                    legend: translate(`${metric}_percentage`),
                    legendPosition: 'middle',
                    legendOffset: -60,
                    format: s => `${s}%`
                }}
                layers={quadrants}
                colors={dot => getColor(dot.serieId)}
                animate={false}
                tooltip={({ node }) => {
                    const { data, x, y } = node
                    return (
                        <span>
                            <strong>
                                {data.name} ({data.serieId})
                            </strong>
                            : {`${x} ${translate('users')},  ${y}${translate(`percent_${metric}`)}`}
                        </span>
                    )
                }}
                // legends={[
                //     {
                //         anchor: 'bottom-right',
                //         direction: 'column',
                //         translateX: -70,
                //         translateY: -20,
                //         itemWidth: 100,
                //         itemHeight: 18,
                //         itemsSpacing: 5,
                //         itemTextColor: colors.teal,
                //         symbolSize: 12,
                //         symbolShape: 'circle'
                //     }
                // ]}
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
