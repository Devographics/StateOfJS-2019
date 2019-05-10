import React, { memo, useCallback } from 'react'
import { useTooltip } from '@nivo/tooltip'
import BumpChartTooltip from './BumpChartTooltip'

const BumpChartLine = ({
    tool,
    currentTool,
    setCurrentTool,
    margin,
    color,
    lineGenerator,
    yScale
}) => {
    const { showTooltipFromEvent, hideTooltip } = useTooltip()
    const onMouseEnter = useCallback(
        event => {
            showTooltipFromEvent(<BumpChartTooltip tool={tool} />, event)
            setCurrentTool(tool.id)
        },
        [tool, showTooltipFromEvent, setCurrentTool]
    )
    const onMouseMove = useCallback(
        event => {
            showTooltipFromEvent(<BumpChartTooltip tool={tool} />, event)
        },
        [tool, showTooltipFromEvent]
    )
    const onMouseLeave = useCallback(() => {
        hideTooltip()
        setCurrentTool(null)
    }, [hideTooltip, setCurrentTool])

    return (
        <>
            <path
                fill="none"
                stroke={color}
                strokeWidth={currentTool !== null && currentTool === tool.id ? 8 : 3}
                d={lineGenerator(tool.linePoints)}
                strokeLinecap="round"
                strokeOpacity={currentTool !== null && currentTool !== tool.id ? 0.2 : 1}
            />
            <path
                fill="none"
                stroke="red"
                strokeOpacity={0}
                strokeWidth={yScale.step()}
                d={lineGenerator([[-margin.left, tool.linePoints[0][1]], ...tool.linePoints])}
                strokeLinecap="square"
                onMouseEnter={onMouseEnter}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
            />
        </>
    )
}

export default memo(BumpChartLine)
