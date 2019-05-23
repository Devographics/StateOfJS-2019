import React, { memo, useMemo } from 'react'
import PropTypes from 'prop-types'
import { ResponsiveBubble } from '@nivo/circle-packing'
import theme from 'nivoTheme'
import { colors } from '../../../constants'

const fontSizeByRadius = radius => {
    if (radius < 10) return 6
    if (radius < 20) return 8
    if (radius < 50) return 10
    return 12
}

const patterns = [
    {
        id: 'dots',
        type: 'patternDots',
        background: colors.teal,
        color: '#6dafb3',
        size: 3,
        padding: 1,
        stagger: true
    }
]

const Node = ({ node, handlers }) => {
    if (node.depth === 0) {
        return (
            <circle
                cx={node.x}
                cy={node.y}
                r={node.r}
                fill="none"
                stroke="#9AC6C9"
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
            <circle r={node.r} fill="url(#dots)" stroke="#6dafb3" strokeWidth={3} />
            <circle r={usageRadius} fill={colors.blue} stroke={colors.blueDark} strokeWidth={3} />
            <text
                textAnchor="middle"
                dominantBaseline="central"
                stroke={colors.teal}
                strokeWidth={4}
                strokeLinejoin="round"
                style={{
                    pointerEvents: 'none',
                    fontSize: fontSizeByRadius(node.r),
                    fontWeight: 600
                }}
            >
                {node.label}
            </text>
            <text
                textAnchor="middle"
                dominantBaseline="central"
                fill={colors.blueDark}
                style={{
                    pointerEvents: 'none',
                    fontSize: fontSizeByRadius(node.r),
                    fontWeight: 600
                }}
            >
                {node.label}
            </text>
        </g>
    )
}

const getChildren = features => {
    return features.map(feature => {
        const usageBucket = feature.usage.buckets.find(b => b.id === 'used_it')
        const knowNotUsedBucket = feature.usage.buckets.find(b => b.id === 'know_not_used')

        return {
            id: feature.id,
            awareness: usageBucket.count + knowNotUsedBucket.count,
            usage: usageBucket.count,
            unusedCount: knowNotUsedBucket.count
        }
    })
}

const FeaturesCirclePackingChart = ({ features }) => {
    const root = useMemo(
        () => ({
            id: 'root',
            children: getChildren(features)
        }),
        [features]
    )

    return (
        <div style={{ height: 440 }}>
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
                defs={patterns}
                root={root}
                value="awareness"
                nodeComponent={Node}
                animate={false}
            />
        </div>
    )
}

FeaturesCirclePackingChart.propTypes = {
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
}

export default memo(FeaturesCirclePackingChart)
