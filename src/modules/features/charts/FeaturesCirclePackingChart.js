import React, { memo, useMemo } from 'react'
import PropTypes from 'prop-types'
import { ResponsiveBubble } from '@nivo/circle-packing'
import { usePie } from '@nivo/pie'
import theme from 'nivoTheme'
import { colors } from '../../../constants'

const fontSizeByRadius = radius => {
    if (radius < 10) return 6
    if (radius < 20) return 8
    if (radius < 50) return 10
    return 12
}

const NodePie = memo(({ radius, data }) => {
    const { arcs, arcGenerator } = usePie({
        radius: radius - 6,
        value: d => d.count,
        data: [
            {
                id: 'used',
                count: data.usedCount
            },
            {
                id: 'unused',
                count: data.unusedCount
            }
        ]
    })

    return arcs.map(arc => (
        <path
            key={arc.data.id}
            d={arcGenerator(arc)}
            fill={arc.data.id === 'used' ? colors.blue : colors.teal}
        />
    ))
})

const Node = ({ node, handlers }) => {
    if (node.depth === 0) {
        return (
            <circle
                cx={node.x}
                cy={node.y}
                r={node.r}
                fill="none"
                stroke={colors.blueLight}
                strokeWidth={2}
                strokeLinecap="round"
                strokeDasharray="1 6"
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
            <NodePie radius={node.r} data={node.data} />
            <circle r={node.r} fill="none" stroke={colors.blue} strokeWidth={2} />
            <text
                textAnchor="middle"
                dominantBaseline="central"
                stroke="#e0e4e4"
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

const FeaturesCirclePackingChart = ({ features }) => {
    const root = useMemo(() => {
        const children = features.map(feature => {
            const usageBucket = feature.usage.buckets.find(b => b.id === 'used_it')
            const knowNotUsedBucket = feature.usage.buckets.find(b => b.id === 'know_not_used')

            return {
                id: feature.id,
                count: usageBucket.count + knowNotUsedBucket.count,
                usedCount: usageBucket.count,
                unusedCount: knowNotUsedBucket.count
            }
        })

        return {
            id: 'root',
            children
        }
    }, [features])

    return (
        <>
            <h4>awareness circle packing + used VS not used nested pie?</h4>
            <div style={{ height: 440 }}>
                <ResponsiveBubble
                    theme={theme}
                    margin={{
                        top: 10,
                        right: 10,
                        bottom: 10,
                        left: 10
                    }}
                    leavesOnly={false}
                    padding={5}
                    colors={['white', 'blue']}
                    root={root}
                    value="count"
                    nodeComponent={Node}
                    animate={false}
                />
            </div>
        </>
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
