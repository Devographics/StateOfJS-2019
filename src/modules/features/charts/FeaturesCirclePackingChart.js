import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { ResponsiveBubble } from '@nivo/circle-packing'
import theme from 'nivoTheme'
import { colors } from '../../../constants'
import ChartLabel from 'core/components/ChartLabel'
import { useEntities } from 'core/entities/entitiesContext'

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
    if (node.depth === 1 && node.data.isSection) {
        return (
            <circle
                cx={node.x}
                cy={node.y}
                r={node.r}
                fill={colors.backgroundLight}
                stroke={colors.teal}
                strokeWidth={1}
                strokeLinecap="round"
                strokeDasharray="2 3"
            />
        )
    }
    const usageRadius = node.r * (node.data.usage / node.data.awareness)

    return (
        <g
            transform={`translate(${node.x},${node.y})`}
            onMouseEnter={handlers.onMouseEnter}
            onMouseMove={handlers.onMouseMove}
            onMouseLeave={handlers.onMouseLeave}
        >
            <circle r={node.r} fill={colors.teal} />
            <circle r={usageRadius} fill={colors.blue} />
            <ChartLabel label={getName(node.label)} fontSize={fontSizeByRadius(node.r)} />
        </g>
    )
}

const FeaturesCirclePackingOverviewChart = ({ data, height = 500 }) => {
    return (
        <div style={{ height }}>
            <ResponsiveBubble
                theme={theme}
                margin={{
                    top: 2,
                    right: 2,
                    bottom: 2,
                    left: 2
                }}
                leavesOnly={false}
                padding={5}
                colors={['white', 'blue']}
                root={data}
                value="awareness"
                nodeComponent={Node}
                animate={false}
            />
        </div>
    )
}

FeaturesCirclePackingOverviewChart.propTypes = {
    data: PropTypes.shape({
        features: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                usage: PropTypes.shape({
                    total: PropTypes.number.isRequired,
                    buckets: PropTypes.arrayOf(
                        PropTypes.shape({
                            id: PropTypes.string.isRequired,
                            count: PropTypes.number.isRequired,
                            percentage: PropTypes.number.isRequired
                        })
                    ).isRequired
                }).isRequired
            })
        )
    })
}

export default memo(FeaturesCirclePackingOverviewChart)
