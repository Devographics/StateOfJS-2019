import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { ResponsiveBubble } from '@nivo/circle-packing'
import theme from 'nivoTheme'
import { colors } from '../../../constants'
import ChartLabel from 'core/components/ChartLabel'
import { useEntities } from 'core/entities/entitiesContext'

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

const Node = ({ node, handlers }) => {

    const { getName } = useEntities()

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
            onMouseEnter={handlers.onMouseEnter}
            onMouseMove={handlers.onMouseMove}
            onMouseLeave={handlers.onMouseLeave}
        >
            {node.data.opinions.map(bucket => {
                const { id, percent, color, offsetPercent } = bucket
                const rRatio = (node.r / rCoefficient) * scaleCoefficient
                return (
                    <circle
                        key={id}
                        r={node.r * scaleCoefficient}
                        fill="transparent"
                        stroke={color}
                        strokeWidth={strokeWidth}
                        strokeDasharray={`${percent * rRatio} ${(100 - percent) * rRatio}`}
                        strokeDashoffset={(100 - offsetPercent) * rRatio}
                    />
                )
            })}

            <ChartLabel label={getName(node.id)} fontSize={fontSizeByRadius(node.r)} />
        </g>
    )
}

const ToolsCirclePackingOverviewChart = ({ data }) => {
    return (
        <div style={{ height: 800 }}>
            <ResponsiveBubble
                theme={theme}
                margin={{
                    top: 2,
                    right: 2,
                    bottom: 2,
                    left: 2
                }}
                identity="id"
                leavesOnly={false}
                padding={5}
                colors={['white', 'blue']}
                root={data}
                value="count"
                nodeComponent={Node}
                animate={false}
            />
        </div>
    )
}

ToolsCirclePackingOverviewChart.propTypes = {
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

export default memo(ToolsCirclePackingOverviewChart)
