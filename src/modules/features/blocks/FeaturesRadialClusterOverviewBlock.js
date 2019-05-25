import React, { memo, useMemo } from 'react'
import { hierarchy as d3Hierarchy, tree as d3Tree } from 'd3-hierarchy'
import { scaleLinear } from 'd3-scale'
import { positionFromAngle } from '@nivo/core'
import { colors } from '../../../constants'

const SectionLabel = memo(({ section, index, radius }) => {
    const centerAngle = section.x - Math.PI * 0.5
    const startAngle = centerAngle - Math.PI * 0.15
    const endAngle = centerAngle + Math.PI * 0.15
    const startPoint = positionFromAngle(startAngle, radius + 14)
    const endPoint = positionFromAngle(endAngle, radius + 14)

    return (
        <>
            <path
                id={`sectionPath${index}`}
                fill="none"
                stroke="pink"
                strokeWidth={3}
                opacity={0}
                d={`
                    M${startPoint.x} ${startPoint.y}
                    A ${radius + 14} ${radius + 14} 0 0 1 ${endPoint.x} ${endPoint.y}
                `}
            />
            <text
                fill="white"
                style={{
                    fontSize: 14,
                    fontWeight: 600
                }}
            >
                <textPath
                    startOffset="50%"
                    textAnchor="middle"
                    alignmentBaseline="top"
                    xlinkHref={`#sectionPath${index}`}
                >
                    {section.data.id}
                </textPath>
            </text>
        </>
    )
})

const FeatureNode = memo(({ feature, barScale }) => {
    return (
        <g
            key={feature.data.id}
            transform={`rotate(${(feature.x * 180) / Math.PI - 90}) translate(${feature.y},0)`}
        >
            <text
                x={-16}
                textAnchor="end"
                dominantBaseline="central"
                stroke="#1a1f35"
                strokeWidth={6}
                strokeLinejoin="round"
                style={{
                    fontSize: 12,
                    fontWeight: 600
                }}
            >
                {feature.data.id}
            </text>
            <text
                x={-16}
                textAnchor="end"
                dominantBaseline="central"
                fill="white"
                style={{
                    fontSize: 12,
                    fontWeight: 600
                }}
            >
                {feature.data.id}
            </text>
            <rect fill={colors.blue} y={-11} width={barScale(feature.data.used)} height={10} />
            <rect fill={colors.teal} y={1} width={barScale(feature.data.notUsed)} height={10} />
        </g>
    )
})

const FeaturesRadialClusterOverviewBlock = ({ data }) => {
    const radius = 340
    const barMaxSize = 80
    const innerRadius = radius - barMaxSize

    const root = useMemo(
        () => ({
            id: 'features',
            children: data.features.nodes.map(section => ({
                id: section.section_id,
                children: section.aggregations.map(tool => {
                    const neverHeard = tool.usage.buckets.find(b => b.id === 'never_heard_not_sure')
                    const notUsed = tool.usage.buckets.find(b => b.id === 'know_not_used')
                    const used = tool.usage.buckets.find(b => b.id === 'used_it')

                    return {
                        id: tool.id,
                        awareness: (tool.usage.total - neverHeard.count) / tool.usage.total,
                        notUsed: notUsed.count / tool.usage.total,
                        used: used.count / tool.usage.total
                    }
                })
            }))
        }),
        [data]
    )

    const layout = useMemo(
        () =>
            d3Tree()
                .size([2 * Math.PI, innerRadius])
                .separation((a, b) => (a.parent === b.parent ? 1 : 2.4) / a.depth),
        [innerRadius]
    )

    const { sections, features } = useMemo(() => {
        const hierarchy = d3Hierarchy(root)
        const tree = layout(hierarchy)
        const nodes = tree.descendants()

        return {
            sections: nodes.filter(node => node.depth === 1),
            features: nodes.filter(node => node.depth === 2)
        }
    }, [root, layout])

    const barScale = useMemo(
        () =>
            scaleLinear()
                .domain([0, 1])
                .range([0, barMaxSize]),
        [barMaxSize]
    )

    return (
        <svg width={radius * 2 + 60} height={radius * 2 + 60}>
            <g transform={`translate(${radius + 30},${radius + 30})`}>
                <circle
                    r={innerRadius + barScale(0.5)}
                    fill="none"
                    stroke={colors.backgroundDark}
                    strokeWidth={barMaxSize}
                />
                <circle r={radius} fill="none" stroke="white" opacity={0.4} />
                <circle
                    r={innerRadius + barScale(0.5)}
                    fill="none"
                    stroke="white"
                    strokeDasharray="3 6"
                    opacity={0.4}
                />
                <circle r={innerRadius} fill="none" stroke="white" opacity={0.4} />
                <g transform={`translate(0,${-radius})`}>
                    <text
                        textAnchor="middle"
                        dominantBaseline="central"
                        style={{
                            fontSize: 11,
                            fill: 'white'
                        }}
                    >
                        100%
                    </text>
                </g>
                <g transform={`translate(0,${(innerRadius + barScale(0.5)) * -1})`}>
                    <text
                        textAnchor="middle"
                        dominantBaseline="central"
                        style={{
                            fontSize: 11,
                            fill: 'white'
                        }}
                    >
                        50%
                    </text>
                </g>
                <g transform={`translate(0,${-innerRadius})`}>
                    <text
                        textAnchor="middle"
                        dominantBaseline="central"
                        style={{
                            fontSize: 11,
                            fill: 'white'
                        }}
                    >
                        0%
                    </text>
                </g>
                {sections.map((section, i) => (
                    <SectionLabel
                        key={section.data.id}
                        section={section}
                        index={i}
                        radius={radius}
                    />
                ))}
                {features.map(feature => (
                    <FeatureNode key={feature.data.id} feature={feature} barScale={barScale} />
                ))}
            </g>
        </svg>
    )
}

export default memo(FeaturesRadialClusterOverviewBlock)
