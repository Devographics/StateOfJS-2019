import React, { memo, useMemo, useState } from 'react'
import { withContainer, useDimensions, SvgWrapper, useTheme } from '@nivo/core'
import { useOrdinalColorScale } from '@nivo/colors'
import { Grid, Axes } from '@nivo/axes'
import { distinctColors } from '../../../../constants'
import { useScales, useLineGenerator } from './hooks'
import BumpChartLine from './BumpChartLine'

const BumpChart = ({ margin: partialMargin, width, height, tools }) => {
    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const { xScale, yScale } = useScales({
        width: innerWidth,
        height: innerHeight,
        tools
    })
    const linePadding = xScale.step() * 0.2

    const lineGenerator = useLineGenerator()

    const toolsWithPoints = useMemo(
        () =>
            tools.map(tool => {
                const linePoints = []
                linePoints.push([0, yScale(tool.awarenessRank)])
                linePoints.push([xScale('awareness'), yScale(tool.awarenessRank)])
                linePoints.push([xScale('awareness') + linePadding, yScale(tool.awarenessRank)])
                linePoints.push([xScale('interest') - linePadding, yScale(tool.interestedRank)])
                linePoints.push([xScale('interest'), yScale(tool.interestedRank)])
                linePoints.push([xScale('interest') + linePadding, yScale(tool.interestedRank)])
                linePoints.push([
                    xScale('satisfaction') - linePadding,
                    yScale(tool.satisfactionRank)
                ])
                linePoints.push([xScale('satisfaction'), yScale(tool.satisfactionRank)])
                linePoints.push([innerWidth, yScale(tool.satisfactionRank)])

                return {
                    ...tool,
                    linePoints
                }
            }),
        [tools, xScale, yScale, linePadding]
    )

    const [currentTool, setCurrentTool] = useState(null)

    const getColor = useOrdinalColorScale(
        distinctColors,
        'id'
    )

    const theme = useTheme()

    return (
        <SvgWrapper width={outerWidth} height={outerHeight} margin={margin}>
            <Grid width={innerWidth} height={innerHeight} xScale={xScale} yScale={yScale} />
            <Axes
                xScale={xScale}
                yScale={yScale}
                width={innerWidth}
                height={innerHeight}
                top={{}}
                bottom={{}}
            />
            {toolsWithPoints.map(tool => (
                <g key={tool.id} transform={`translate(0,${yScale(tool.awarenessRank)})`}>
                    <text
                        x={-12}
                        textAnchor="end"
                        dominantBaseline="central"
                        opacity={currentTool !== null && currentTool !== tool.id ? 0.3 : 1}
                        style={{
                            ...theme.axis.ticks.text,
                            fontSize: 14,
                            fontWeight: 600,
                            fill: getColor(tool)
                        }}
                    >
                        {tool.id}
                    </text>
                </g>
            ))}
            {toolsWithPoints.map(tool => (
                <BumpChartLine
                    key={tool.id}
                    tool={tool}
                    currentTool={currentTool}
                    setCurrentTool={setCurrentTool}
                    color={getColor(tool)}
                    lineGenerator={lineGenerator}
                    yScale={yScale}
                    margin={margin}
                />
            ))}
            {toolsWithPoints.map(tool => {
                const radius = currentTool !== null && currentTool === tool.id ? 8 : 4

                return (
                    <g
                        key={tool.id}
                        opacity={currentTool !== null && currentTool !== tool.id ? 0 : 1}
                        style={{ pointerEvents: 'none' }}
                    >
                        <circle
                            cx={xScale('awareness')}
                            cy={yScale(tool.awarenessRank)}
                            r={radius}
                            fill={getColor(tool)}
                        />
                        <circle
                            cx={xScale('interest')}
                            cy={yScale(tool.interestedRank)}
                            r={radius}
                            fill={getColor(tool)}
                        />
                        <circle
                            cx={xScale('satisfaction')}
                            cy={yScale(tool.satisfactionRank)}
                            r={radius}
                            fill={getColor(tool)}
                        />
                    </g>
                )
            })}
        </SvgWrapper>
    )
}

export default memo(withContainer(BumpChart))
