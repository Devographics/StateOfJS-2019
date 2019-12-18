import React, { useEffect, useMemo, useRef, useState } from 'react'
import { scaleLinear } from 'd3-scale'
import map from 'lodash/map'
import range from 'lodash/range'
import flatten from 'lodash/flatten'
import { extent, max, sum } from 'd3-array'
import { toolsCategories } from '../../../../../config/variables.yml'
import offsets from './toolsArrowsLabelOffsets.json'
import { getColor } from 'core/constants.js'

import './ToolsArrowsChart.scss'

let toolToCategoryMap = {}
map(toolsCategories, (tools, category) => {
    tools.forEach(tool => {
        toolToCategoryMap[tool] = category
    })
})
let categoryColorMap = {}
let categoryColorScales = {}
map(toolsCategories, (tools, category) => {
    const color = getColor(category)
    categoryColorMap[category] = color
    categoryColorScales[category] = scaleLinear()
        .domain([0, 40])
        .range([color, '#303652'])
        .clamp(true)
})
const gradientLineWidthScale = scaleLinear()
    .domain([0, 40])
    .range([11, 9])
    .clamp(true)

const margins = {
    marginTop: 20,
    marginRight: 20,
    marginBottom: 20,
    marginLeft: 20
}
const ToolsArrowsChart = ({ data, activeCategory }) => {
    const [ref, dms] = useChartDimensions(margins, true)
    const [hoveredTool, setHoveredTool] = useState(null)

    const tools = data.map(d => d.id)
    let toolNames = {}
    data.forEach(tool => {
        toolNames[tool.id] = tool.entity.name
    })

    const points = useMemo(
        () =>
            data.map(tool =>
                tool.experience.allYears.map(({ buckets }) => {
                    const points = buckets.map(({ id, percentage }) =>
                        conditionDiffs[id].map(d => d * percentage)
                    )
                    return [sum(points.map(d => d[0])), sum(points.map(d => d[1]))]
                })
            ),
        [data]
    )

    const scales = useMemo(() => {
        const xExtent = extent(flatten(points).map(d => d[0]))
        const maxAbsX = max(xExtent.map(Math.abs))
        const xScale = scaleLinear()
            .domain([-maxAbsX, maxAbsX])
            .range([0, dms.boundedWidth])

        const yExtent = extent(flatten(points).map(d => d[1]))
        const maxAbsY = max(yExtent.map(Math.abs))
        const yScale = scaleLinear()
            .domain([-maxAbsY, maxAbsY])
            .range([dms.boundedHeight, 0])

        return {
            x: xScale,
            y: yScale
        }
    }, [points, dms])

    return (
        <div
            ref={ref}
            className={`ToolsArrowsChart ToolsArrowsChart--is-${
                activeCategory !== 'all' ? 'animated' : 'not-animated'
            }`}
        >
            <svg className="ToolsArrowsChart__svg" height={dms.height} width={dms.width}>
                <g transform={`translate(${dms.marginLeft}, ${dms.marginTop})`}>
                    <line
                        className="ToolsArrowsChart__axis"
                        x2={dms.boundedWidth}
                        y1={dms.boundedHeight / 2}
                        y2={dms.boundedHeight / 2}
                    />
                    <line
                        className="ToolsArrowsChart__axis"
                        x1={dms.boundedWidth / 2}
                        x2={dms.boundedWidth / 2}
                        y2={dms.boundedHeight}
                    />
                    <text className="ToolsArrowsChart__axis__label" y={dms.boundedHeight / 2 - 10}>
                        dislike
                    </text>
                    <text
                        className="ToolsArrowsChart__axis__label"
                        x={dms.boundedWidth}
                        y={dms.boundedHeight / 2 - 10}
                        style={{
                            textAnchor: 'end'
                        }}
                    >
                        like
                    </text>
                    <text
                        className="ToolsArrowsChart__axis__label"
                        x={dms.boundedWidth / 2}
                        y={10}
                        style={{
                            textAnchor: 'middle'
                        }}
                    >
                        have tried
                    </text>
                    <text
                        className="ToolsArrowsChart__axis__label"
                        x={dms.boundedWidth / 2}
                        y={dms.boundedHeight - 10}
                        style={{
                            textAnchor: 'middle'
                        }}
                    >
                        have not tried
                    </text>

                    {points.map((points, i) => {
                        const tool = tools[i]
                        const toolName = toolNames[tool]
                        const category = toolToCategoryMap[tool]
                        if (!points.length) return null
                        if (activeCategory !== 'all' && activeCategory !== category) return null

                        const thisYearPoint = points.slice(-1)[0]
                        const circles = flatten(
                            points.map(([x, y], i) => {
                                const nextPoint = points[i + 1]
                                if (!nextPoint) return []
                                const xScale = scaleLinear()
                                    .domain([0, 20])
                                    .range([x, nextPoint[0]])
                                const yScale = scaleLinear()
                                    .domain([0, 20])
                                    .range([y, nextPoint[1]])
                                return range(0, 21).map(i => [
                                    scales.x(xScale(i)),
                                    scales.y(yScale(i))
                                ])
                            })
                        )

                        const backgroundPath = [
                            'M',
                            points.map(([x, y]) => [scales.x(x), scales.y(y)].join(',')).join('L ')
                        ].join(' ')
                        console.log(backgroundPath)

                        const x = scales.x(thisYearPoint[0])
                        const y = scales.y(thisYearPoint[1])
                        const color = categoryColorMap[category]
                        const colorScale = categoryColorScales[category]

                        return (
                            <g
                                className={`ToolsArrowsChart__tool ToolsArrowsChart__tool--is-${
                                    !hoveredTool
                                        ? 'normal'
                                        : hoveredTool === tool
                                        ? 'hovering'
                                        : 'hovering-other'
                                }`}
                                onMouseEnter={() => setHoveredTool(tool)}
                                onMouseLeave={() => setHoveredTool(null)}
                            >
                                {circles.slice(0, -1).map(([x, y], i) => (
                                    <line
                                        className={`ToolsArrowsChart__gradient-line ToolsArrowsChart__gradient-line--nth-${circles.length -
                                            i}`}
                                        x1={x}
                                        y1={y}
                                        x2={(circles[i + 1] || [])[0]}
                                        y2={(circles[i + 1] || [])[1]}
                                        stroke={colorScale(circles.length - i)}
                                        style={{
                                            strokeWidth: gradientLineWidthScale(circles.length - i)
                                        }}
                                    />
                                ))}
                                <circle
                                    className="ToolsArrowsChart__now"
                                    cx={x}
                                    cy={y}
                                    fill={color}
                                    r="6"
                                />
                                <path
                                    className="ToolsArrowsChart__hover-background"
                                    d={backgroundPath}
                                />
                                <text
                                    className="ToolsArrowsChart__label-background"
                                    x={x + ((offsets[tools[i]] || {}).x || 0)}
                                    y={y + ((offsets[tools[i]] || {}).y || 0)}
                                >
                                    {toolName}
                                </text>
                                <text
                                    className="ToolsArrowsChart__label"
                                    fill={color}
                                    x={x + ((offsets[tools[i]] || {}).x || 0)}
                                    y={y + ((offsets[tools[i]] || {}).y || 0)}
                                >
                                    {toolName}
                                </text>
                                {hoveredTool === tool &&
                                    points.map(([x, y], i) => (
                                        <text
                                            className="ToolsArrowsChart__year"
                                            x={scales.x(x)}
                                            y={scales.y(y)}
                                            style={{
                                                textAnchor:
                                                    scales.x(x) > dms.boundedWidth - 200
                                                        ? 'end'
                                                        : 'start'
                                            }}
                                        >
                                            {2019 - (points.length - 1 - i)}
                                        </text>
                                    ))}
                            </g>
                        )
                    })}
                </g>
            </svg>
        </div>
    )
}

ToolsArrowsChart.propTypes = {
    // ...
}

export default ToolsArrowsChart

const conditionDiffs = {
    never_heard: [0, 0],
    not_interested: [-1, -1],
    interested: [1, -1],
    would_not_use: [-1, 1],
    would_use: [1, 1]
}

export const combineChartDimensions = dimensions => {
    let parsedDimensions = {
        marginTop: 0,
        marginRight: 0,
        marginBottom: 0,
        marginLeft: 0,
        ...dimensions
    }

    return {
        ...parsedDimensions,
        boundedHeight: Math.max(
            parsedDimensions.height - parsedDimensions.marginTop - parsedDimensions.marginBottom,
            0
        ),
        boundedWidth: Math.max(
            parsedDimensions.width - parsedDimensions.marginLeft - parsedDimensions.marginRight,
            0
        )
    }
}

export const useChartDimensions = (passedSettings, isSquare = false) => {
    const ref = useRef()
    const dimensions = combineChartDimensions(passedSettings)

    const [width, changeWidth] = useState(0)
    const [height, changeHeight] = useState(0)

    useEffect(() => {
        if (dimensions.width && dimensions.height) return [ref, dimensions]

        const element = ref.current
        const onResize = () => {
            if (!element) return

            const dimensions = element.getBoundingClientRect()

            if (width !== dimensions.width) {
                changeWidth(dimensions.width)
                if (isSquare) {
                    changeHeight(dimensions.width)
                }
            }
            if (!isSquare && height !== dimensions.height) changeHeight(dimensions.height)
        }
        window.addEventListener('resize', onResize)
        setTimeout(onResize, 100)

        return () => window.removeEventListener('resize', onResize)
    }, [dimensions, height, width, isSquare])

    const newSettings = combineChartDimensions({
        ...dimensions,
        width: dimensions.width || width,
        height: dimensions.height || height
    })

    return [ref, newSettings]
}
