import React, { memo, useMemo, useState } from 'react'
import { withContainer, useDimensions, SvgWrapper, useTheme } from '@nivo/core'
import { useOrdinalColorScale } from '@nivo/colors'
import { Grid, Axes } from '@nivo/axes'
import { distinctColors } from '../../../../constants'
import { useScales, useLineGenerator } from './hooks'
import BumpChartLine from './BumpChartLine'
import { useEntities } from 'core/entities/entitiesContext'
import { colors, totalCount } from '../../../../constants'
import round from 'lodash/round'

const Node = ({ x, y, fill, label, isCurrent }) => (
    <g
        className="BumpChart__Node"
        transform={`translate(${x}, ${y}) scale(${isCurrent ? 1.2 : 1})`}
    >
        <circle
            r={16}
            fill={isCurrent ? colors.white : colors.navy}
            stroke={fill}
            strokeWidth={isCurrent ? 6.6 : 3}
        />
        <text fontSize={11} fill={isCurrent ? colors.navy : colors.teal} textAnchor="middle" alignmentBaseline="middle">
            {label}
        </text>
    </g>
)

const BumpChart = ({ margin: partialMargin, width, height, tools }) => {
    const { getName } = useEntities()

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

    const getColor = useOrdinalColorScale(distinctColors, 'id')

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
                        {getName(tool.id)}
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
                const isCurrent = currentTool === tool.id
                const { awareness: awarenessCount, interest, satisfaction } = tool
                const awareness = awarenessCount / totalCount
                return (
                    <g
                        key={tool.id}
                        opacity={currentTool !== null && currentTool !== tool.id ? 0 : 1}
                        style={{ pointerEvents: 'none' }}
                    >
                        <Node
                            isCurrent={isCurrent}
                            x={xScale('awareness')}
                            y={yScale(tool.awarenessRank)}
                            fill={getColor(tool)}
                            label={`${round(awareness * 100)}%`}
                        />
                        <Node
                            isCurrent={isCurrent}
                            x={xScale('interest')}
                            y={yScale(tool.interestedRank)}
                            fill={getColor(tool)}
                            label={`${round(interest * 100)}%`}
                        />
                        <Node
                            isCurrent={isCurrent}
                            x={xScale('satisfaction')}
                            y={yScale(tool.satisfactionRank)}
                            fill={getColor(tool)}
                            label={`${round(satisfaction * 100)}%`}
                        />
                    </g>
                )
            })}
        </SvgWrapper>
    )
}

export default memo(withContainer(BumpChart))
