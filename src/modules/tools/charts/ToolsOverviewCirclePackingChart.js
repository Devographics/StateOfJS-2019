import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import { ResponsiveBubble } from '@nivo/circle-packing'
import theme from 'nivoTheme'
import { colors } from '../../../constants'
import ChartLabel from 'core/components/ChartLabel'
import { useI18n } from 'core/i18n/i18nContext'

// scale circles down to account for width of border
const strokeWidth = 10
const scaleCoefficient = 0.9

// see https://hackernoon.com/a-simple-pie-chart-in-svg-dbdd653b6936
const rCoefficient = 15.91549430918952

const fontSizeByRadius = radius => {
    if (radius < 25) return 8
    if (radius < 35) return 10
    if (radius < 45) return 12
    return 14
}

const Node = ({ node, handlers, activeId, setActiveId, setNull }) => {
    const { translate } = useI18n()

    if (node.depth === 0) {
        return (
            <circle
                cx={node.x}
                cy={node.y}
                r={node.r}
                fill="none"
                stroke={colors.teal}
                strokeWidth={1}
                strokeLinecap="round"
                strokeDasharray="2 3"
            />
        )
    }

    if (node.depth === 1) {
        return (
            <circle
                cx={node.x}
                cy={node.y}
                r={node.r}
                fill="rgba(255,255,255,0.1)"
                stroke={colors.teal}
                strokeWidth={1}
                strokeLinecap="round"
                strokeDasharray="2 3"
            />
        )
    }
    return (
        <g
            transform={`translate(${node.x},${node.y})`}
            // onMouseEnter={handlers.onMouseEnter}
            // onMouseMove={handlers.onMouseMove}
            // onMouseLeave={handlers.onMouseLeave}

            onMouseOver={() => {
                console.log(`enter ${node.id}`)
                setActiveId(node.id)
            }}
            onMouseLeave={() => {
                console.log(`leave ${node.id}`)
                setNull()
            }}
            className={`CirclePackingNode ${
                activeId === null
                    ? ''
                    : activeId === node.id
                    ? 'CirclePackingNode--active'
                    : 'CirclePackingNode--inactive'
            }`}
        >
            {/* used for larger mouseover zone */}
            <circle r={node.r * scaleCoefficient * 1.3} fill="transparent" />

            {node.data.opinions.map((bucket, i) => {
                const { percent, color, offsetPercent } = bucket
                const rRatio = (node.r / rCoefficient) * scaleCoefficient
                return (
                    <circle
                        key={i}
                        r={node.r * scaleCoefficient}
                        fill="transparent"
                        stroke={color}
                        strokeWidth={strokeWidth}
                        strokeDasharray={`${percent * rRatio} ${(100 - percent) * rRatio}`}
                        strokeDashoffset={(100 - offsetPercent) * rRatio}
                    />
                )
            })}

            <g>
                {node.data.opinions.map((bucket, i) => {
                    const { id, count, percent, color, offsetPercent } = bucket
                    const r = node.r * scaleCoefficient
                    const arcOffset = offsetPercent + percent / 2
                    const arcAngle = (arcOffset * Math.PI * 2) / 100
                    const cos = Math.cos(arcAngle)
                    const sin = Math.sin(arcAngle)
                    const xOffset = r * cos
                    const yOffset = r * sin

                    const textWidth =
                        `${translate(`opinions.legends_extrashort.${id}`)} ${count}`.length * 10

                    return (
                        <g
                            className="CirclePackingNode__Legend"
                            transform={`translate(${xOffset},${yOffset})`}
                            key={i}
                        >
                            <circle r={8} fill={color} />
                            <g opacity={0.5}>
                                <line
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit="10"
                                    strokeWidth="2"
                                    stroke={color}
                                    x1="0"
                                    y1="0"
                                    x2={cos * 110}
                                    y2={sin * 110}
                                />
                                <rect
                                    fill={color}
                                    x={cos * 120 - textWidth / 2}
                                    y={sin * 120 - 20}
                                    width={textWidth}
                                    height={30}
                                />
                            </g>
                            <text
                                className="CirclePackingNode__Legend__Label"
                                x={cos * 120}
                                y={sin * 120}
                                textAnchor="middle"
                                alignmentBaseline="middle"
                                fill="white"
                            >
                                <tspan>{translate(`opinions.legends_extrashort.${id}`)}: </tspan>
                                <tspan className="CirclePackingNode__Legend__Value">{count}</tspan>
                            </text>
                        </g>
                    )
                })}
            </g>

            <ChartLabel label={node.label} fontSize={fontSizeByRadius(node.r)} />
        </g>
    )
}

const ToolsOverviewCirclePackingChart = ({ data }) => {
    const [activeId, _setActiveId] = useState(null)

    let leaveTimer

    const setActiveId = id => {
        _setActiveId(id)
        // if we enter any node, clear the setNull timeout
        clearTimeout(leaveTimer)
    }

    const setNull = () => {
        // if we leave a node, start a very short timeout before setting the active id to null
        leaveTimer = setTimeout(() => {
            _setActiveId(null)
        }, 100)
    }

    return (
        <div style={{ height: 800 }} className="ToolsOverviewCirclePackingChart CirclePackingChart">
            <ResponsiveBubble
                theme={theme}
                margin={{
                    top: 2,
                    right: 2,
                    bottom: 2,
                    left: 2
                }}
                identity="name"
                leavesOnly={false}
                padding={5}
                colors={['white', 'blue']}
                root={data}
                value="count"
                nodeComponent={props => (
                    <Node
                        {...props}
                        activeId={activeId}
                        setActiveId={setActiveId}
                        setNull={setNull}
                    />
                )}
                animate={false}
            />
        </div>
    )
}

ToolsOverviewCirclePackingChart.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.string.isRequired,
        children: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                children: PropTypes.arrayOf(
                    PropTypes.shape({
                        id: PropTypes.string.isRequired,
                        count: PropTypes.number.isRequired,
                        opinions: PropTypes.arrayOf(
                            PropTypes.shape({
                                id: PropTypes.string.isRequired,
                                count: PropTypes.number.isRequired,
                                offsetSum: PropTypes.number.isRequired,
                                color: PropTypes.string.isRequired
                            })
                        ).isRequired
                    }).isRequired
                )
            })
        )
    }).isRequired
}

export default memo(ToolsOverviewCirclePackingChart)
