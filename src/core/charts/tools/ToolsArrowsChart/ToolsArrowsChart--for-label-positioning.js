import React, { useEffect, useMemo, useRef, useState } from 'react'
import { scaleLinear } from 'd3-scale'
import map from "lodash/map"
import { extent, max, sum } from 'd3-array'
import { toolsCategories } from '../../../../../config/variables.yml'
import offsetsData from "./toolsArrowsLabelOffsets.json"
import { colors, getColor } from 'core/constants.js'

import "./ToolsArrowsChart.scss"

let toolToCategoryMap = {}
map(toolsCategories, (tools, category) => {
    tools.forEach(tool => {
        toolToCategoryMap[tool] = category
    })
})

const margins = {
    marginTop: 20,
    marginRight: 20,
    marginBottom: 20,
    marginLeft: 20,
}
const ToolsArrowsChart = ({ data, activeCategory }) => {
    const [ref, dms] = useChartDimensions(margins, true)

    const tools = data.map(d => d.id)
    let toolNames = {}
    data.forEach(tool => {
        toolNames[tool.id] = tool.entity.name
    })

    const points = useMemo(() => (
        data.map(tool => (
            ["lastYear", "thisYear"].map(year => {
                const buckets = (tool.experience[year] || {}).buckets || []
                const points = buckets.map(status => (
                    conditionDiffs[status.id].map(d => (
                        d * status.percentage
                    ))
                ))
                return [
                    sum(points.map(d => d[0])),
                    sum(points.map(d => d[1])),
                ]
            })
        ))
    ), [data])

    const scales = useMemo(() => {
        const xExtent = extent(points.flat().map(d => d[0]))
        const maxAbsX = max(xExtent.map(Math.abs))
        const xScale = scaleLinear()
            .domain([-maxAbsX, maxAbsX])
            .range([0, dms.boundedWidth])

        const yExtent = extent(points.flat().map(d => d[1]))
        const maxAbsY = max(yExtent.map(Math.abs))
        const yScale = scaleLinear()
            .domain([-maxAbsY, maxAbsY])
            .range([dms.boundedHeight, 0])

        return {
            x: xScale,
            y: yScale,
        }
    }, [points, dms])

    // label positioning on drag

    const labelBeingDragged = useRef(null)
    const dragStartPosition = useRef({})
    const offsets = useRef(offsetsData)
    const [iteration, setIteration] = useState(0)
    const iterationRef = useRef(0)
    iterationRef.current = iteration

    function onDrag(e) {
      if (!offsets.current) return
      offsets.current[labelBeingDragged.current] = {
          x: e.clientX - dragStartPosition.current.x,
          y: e.clientY - dragStartPosition.current.y,
      }
      setIteration(iterationRef.current + 1)
    }

    const onDragEnd = () => {
        labelBeingDragged.current = null
        window.removeEventListener("pointerup", onDragEnd)
        window.removeEventListener("pointermove", onDrag)
        setIteration(iteration + 1)
        console.log("%coffsets", "color: #7083EC", offsets.current)
    }

    const onDragStartLocal = label => e => {
        labelBeingDragged.current = label
        dragStartPosition.current = {
            x: e.clientX,
            y: e.clientY,
        }
        window.addEventListener("pointerup", onDragEnd)
        window.addEventListener("pointermove", onDrag)
    }


    return (
        <div ref={ref} className="ToolsArrowsChart">
            <svg className="ToolsArrowsChart__svg" height={dms.height} width={dms.width}>
                <defs>
                    <path
                        id="ToolsArrowsChart__arrow"
                        d="M 0 -9 L 4 0 L -4 0 Z"
                    />
                </defs>

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
                    <text
                        className="ToolsArrowsChart__axis__label"
                        y={dms.boundedHeight / 2 - 10}>
                        dislike
                    </text>
                    <text
                    className="ToolsArrowsChart__axis__label"
                        x={dms.boundedWidth}
                        y={dms.boundedHeight / 2 - 10}
                        style={{
                            textAnchor: "end"
                        }}>
                        like
                    </text>
                    <text
                        className="ToolsArrowsChart__axis__label"
                        x={dms.boundedWidth / 2}
                        y={10}
                        style={{
                            textAnchor: "middle"
                        }}>
                        have tried
                    </text>
                    <text
                        className="ToolsArrowsChart__axis__label"
                        x={dms.boundedWidth / 2}
                        y={dms.boundedHeight - 10}
                        style={{
                            textAnchor: "middle"
                        }}>
                        have not tried
                    </text>

                    {points.map((points, i) => {
                        const tool = tools[i]
                        const toolName = toolNames[tool]
                        const category = toolToCategoryMap[tool]
                        if (activeCategory != "all" && activeCategory != category) return

                        const [lastYearPoint, thisYearPoint] = points
                        const x1 = scales.x(lastYearPoint[0] || thisYearPoint[0])
                        const x2 = scales.x(thisYearPoint[0])
                        const y1 = scales.y(lastYearPoint[1] || thisYearPoint[1])
                        const y2 = scales.y(thisYearPoint[1])
                        const xDiff = x2 - x1
                        const yDiff = y2 - y1
                        const angle = Math.atan2(yDiff, xDiff) * 180 / Math.PI + 90
                        // const hypotenuse = Math.sqrt(Math.pow(Math.abs(xDiff), 2) + Math.pow(Math.abs(yDiff), 2))

                        // const color = colorScale(hypotenuse)
                        const color = getColor(category)

                        return (
                            <g>
                                <line
                                    className="ToolsArrowsChart__path"
                                    key={i}
                                    x1={x2}
                                    x2={x1}
                                    y1={y2}
                                    y2={y1}
                                    stroke={color}
                                    title={toolName}
                                />
                                <use
                                    href="#ToolsArrowsChart__arrow"
                                    className="ToolsArrowsChart__arrow"
                                    x={x2}
                                    y={y2}
                                    style={{
                                    transformOrigin: `${x2}px ${y2}px`
                                    }}
                                    transform={`rotate(${angle})`}
                                    fill={color}
                                    title={toolName}
                                />
                                <circle
                                    cx={scales.x(x1)}
                                    cy={scales.y(y1)}
                                    r={3}
                                    fill={color}
                                />
                                ))}
                                {/* {points.map(([x, y], pointI) => (x != 0 || y != 0) && (
                                    <circle
                                    cx={xScale(x)}
                                    cy={yScale(y)}
                                    r={circleScale(pointI)}
                                    fill={color}
                                    />
                                ))} */}
                                <g
                                    className="ToolsArrowsChart__label__box"
                                    transform={`translate(${
                                        x2 + ((offsets.current[tools[i]] || {}).x || 0)
                                    }, ${
                                        y2 + ((offsets.current[tools[i]] || {}).y || 0)
                                    })`}
                                    onMouseDown={onDragStartLocal(tools[i])}
                                    >
                                    <rect
                                        y="-10"
                                        width="50"
                                        height="10"
                                        fill="white"
                                        fillOpacity="0.01"
                                    />
                                    <text
                                        className="ToolsArrowsChart__label"
                                        fill={color}
                                    >
                                        { toolName }
                                    </text>
                                </g>
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
    would_use: [1, 1],
}

export const combineChartDimensions = dimensions => {
    let parsedDimensions = {
        marginTop: 0,
        marginRight: 0,
        marginBottom: 0,
        marginLeft: 0,
        ...dimensions,
    }

    return {
        ...parsedDimensions,
        boundedHeight: Math.max(parsedDimensions.height - parsedDimensions.marginTop - parsedDimensions.marginBottom, 0),
        boundedWidth: Math.max(parsedDimensions.width - parsedDimensions.marginLeft - parsedDimensions.marginRight, 0),
    }
  }

  export const useChartDimensions = (passedSettings, isSquare=false) => {
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
        window.addEventListener("resize", onResize)
        setTimeout(onResize, 100)

        return () => window.removeEventListener("resize", onResize)
    }, [dimensions, height, width])

    const newSettings = combineChartDimensions({
        ...dimensions,
        width: dimensions.width || width,
        height: dimensions.height || height,
    })

    return [ref, newSettings]
}

const colorScale = scaleLinear()
.domain([0, 160])
.range(["#41c7c7", "#fff"])

