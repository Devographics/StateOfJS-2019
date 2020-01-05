import React from 'react'
import { ResponsiveStream } from '@nivo/stream'
import theme from 'nivoTheme'
import { useI18n } from 'core/i18n/i18nContext'

const Dot = ({ x, y, data, current, units }) => {
    if (current !== null && data.key !== current) {
        return null
    }

    const availableHeight = data.y1 - data.y2
    if (availableHeight < 8 && current === null) return null

    let label = data.value
    if (units === 'percentage') {
        label = `${label}%`
    }

    return (
        <g transform={`translate(${x},${y})`}>
            <rect fill={'rgba(255,255,255,0.7)'} x={-23} y={-11} width={46} height={22} r={16} />
            <text
                x={15}
                fill="#212424"
                textAnchor="end"
                alignmentBaseline="middle"
                style={{
                    fontSize: 11,
                    fontWeight: 600
                }}
            >
                {label}
            </text>
        </g>
    )
}

const margin = {
    top: 40,
    right: 20,
    bottom: 40,
    left: 20
}

const getChartData = (data, units) => {
    return data.map(y => {
        const { year, buckets } = y
        const item = {
            id: year
        }
        buckets.forEach(b => {
            item[b.id] = b[units]
        })
        return item
    })
}

const StreamChart = ({
    data,
    keys,
    units,
    className,
    current,
    colorScale,
    namespace,
    applyEmptyPatternTo
}) => {
    const { translate } = useI18n()

    const horizontalAxis = {
        tickSize: 10,
        tickPadding: 6,
        format: i => data[i].year
    }

    const additionalClassName = className ? ` ${className}` : ``

    let tooltipFormat
    if (units === 'percents') {
        tooltipFormat = d => `${d.value}%`
    }

    const getLayerColor = ({ index }) => {
        if (current !== null && current !== `${namespace}.${keys[index]}`) {
            return `${colorScale[index]}33`
        }
        return colorScale[index]
    }

    return (
        <div style={{ height: 260 }} className={`StreamChart${additionalClassName}`}>
            <ResponsiveStream
                theme={{
                    ...theme,
                    axis: theme.streamTimelineAxis
                }}
                offsetType="expand"
                colors={getLayerColor}
                curve="monotoneX"
                margin={margin}
                keys={keys}
                data={getChartData(data, units)}
                enableGridX={false}
                enableGridY={false}
                axisLeft={undefined}
                axisTop={horizontalAxis}
                axisBottom={horizontalAxis}
                enableDots={true}
                renderDot={d => <Dot {...d} current={current} units={units} />}
                dotColor="inherit:brighter(0.6)"
                animate={false}
                tooltipLabel={d => translate(`${namespace}.${d.id}.short`)}
                tooltipFormat={tooltipFormat}
                defs={[theme.emptyPattern]}
                fill={[
                    {
                        match: {
                            id: applyEmptyPatternTo
                        },
                        id: 'empty'
                    }
                ]}
            />
        </div>
    )
}

export default StreamChart
