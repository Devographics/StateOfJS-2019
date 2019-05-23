import React, { memo } from 'react'
import { hierarchy as d3Hierarchy, tree as d3Tree } from 'd3-hierarchy'
// import { linkRadial } from 'd3-shape'
import { positionFromAngle } from '@nivo/core'
import { colors } from '../../../constants'

const FeaturesRadialClusterOverviewBlock = ({ data }) => {
    const root = {
        id: 'features',
        children: []
    }
    data.features.nodes.forEach(section => {
        root.children.push({
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
        })
    })

    const radius = 340
    const barMaxSize = 80
    // const circleMaxRadius = 36

    const treeRadius = radius - barMaxSize

    const barInnerRadius = radius - barMaxSize
    const barMidRadius = radius - (radius - barInnerRadius) / 2
    const barOuterRadius = radius

    const layout = d3Tree()
        .size([2 * Math.PI, treeRadius])
        .separation((a, b) => (a.parent === b.parent ? 1 : 2.4) / a.depth)

    const hierarchy = d3Hierarchy(root)
    const tree = layout(hierarchy)
    const nodes = tree.descendants()
    const sections = nodes.filter(node => node.depth === 1)
    const features = nodes.filter(node => node.depth === 2)

    // const linkGenerator = linkRadial()
    //     .angle(d => d.x)
    //     .radius(d => d.y)

    return (
        <svg width={radius * 2 + 60} height={radius * 2 + 60}>
            <g transform={`translate(${radius + 30},${radius + 30})`}>
                <mask id="innerMask">
                    <circle r={barInnerRadius} fill="white" />
                </mask>
                <g mask="url(#innerMask)">
                    {/*features.map(feature => {
                        return (
                            <g
                                key={feature.data.id}
                                transform={`rotate(${feature.x * 180 / Math.PI - 90}) translate(${feature.y},0)`}
                            >
                                <circle
                                    r={feature.data.awareness * circleMaxRadius}
                                    fill={colors.teal}
                                />
                            </g>
                        )
                    })*/}
                </g>
                <circle r={barMidRadius} fill="none" stroke="#1a1f35" strokeWidth={barMaxSize} />
                <circle r={barOuterRadius} fill="none" stroke="white" opacity={0.4} />
                <circle
                    r={barMidRadius}
                    fill="none"
                    stroke="white"
                    strokeDasharray="3 6"
                    opacity={0.4}
                />
                <circle r={barInnerRadius} fill="none" stroke="white" opacity={0.4} />
                <g transform={`translate(0,${-barOuterRadius})`}>
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
                <g transform={`translate(0,${-barMidRadius})`}>
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
                <g transform={`translate(0,${-barInnerRadius})`}>
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
                {/*tree.links().filter(link => link.source.depth > 0).map(link => {
                    return (
                        <path
                            fill="none"
                            stroke={colors.teal}
                            opacity={.6}
                            strokeWidth={2}
                            d={linkGenerator(link)}
                        />
                    )
                })*/}
                {/*sections.map(section => {
                    return (
                        <g
                            key={section.data.id}
                            transform={`rotate(${section.x * 180 / Math.PI - 90}) translate(${section.y},0)`}
                        >
                            <circle
                                r={6}
                                fill="#1a1f35"
                                stroke={colors.teal}
                                strokeWidth={2}
                            />
                            <text
                                x={-10}
                                textAnchor="end"
                                dominantBaseline="central"
                                stroke="#1a1f35"
                                strokeWidth={4}
                                strokeLinejoin="round"
                                style={{ fontSize: 10 }}
                            >
                                {section.data.id}
                            </text>
                            <text
                                x={-10}
                                textAnchor="end"
                                dominantBaseline="central"
                                fill="white"
                                style={{ fontSize: 10 }}
                            >
                                {section.data.id}
                            </text>
                        </g>
                    )
                })*/}
                {sections.map((section, i) => {
                    const centerAngle = section.x - Math.PI * 0.5
                    const startAngle = centerAngle - Math.PI * 0.15
                    const endAngle = centerAngle + Math.PI * 0.15
                    const startPoint = positionFromAngle(startAngle, radius + 14)
                    const endPoint = positionFromAngle(endAngle, radius + 14)

                    return (
                        <g key={section.data.id}>
                            <path
                                id={`sectionPath${i}`}
                                fill="none"
                                stroke="pink"
                                strokeWidth={3}
                                opacity={0}
                                d={`
                                    M${startPoint.x} ${startPoint.y}
                                    A ${radius + 14} ${radius + 14} 0 0 1 ${endPoint.x} ${
                                    endPoint.y
                                }
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
                                    xlinkHref={`#sectionPath${i}`}
                                >
                                    {section.data.id}
                                </textPath>
                            </text>
                        </g>
                    )
                })}
                {features.map(feature => {
                    return (
                        <g
                            key={feature.data.id}
                            transform={`rotate(${(feature.x * 180) / Math.PI - 90}) translate(${
                                feature.y
                            },0)`}
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
                            {/*
                            <circle
                                r={feature.data.awareness * circleMaxRadius}
                                fill="none"
                                stroke={colors.teal}
                                strokeOpacity={.3}
                            />
                            */}
                            <rect
                                fill={colors.blue}
                                y={-11}
                                width={feature.data.used * barMaxSize}
                                height={10}
                            />
                            <rect
                                fill={colors.teal}
                                y={1}
                                width={feature.data.notUsed * barMaxSize}
                                height={10}
                            />
                        </g>
                    )
                })}
            </g>
        </svg>
    )
}

export default memo(FeaturesRadialClusterOverviewBlock)
