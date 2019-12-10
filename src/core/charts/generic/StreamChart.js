import React from 'react'
import { ResponsiveStream } from '@nivo/stream'
import theme from 'nivoTheme'
import { opinions } from 'core/constants.js'
// import OpinionsLegends from 'core/charts/OpinionsLegends'
import { useI18n } from 'core/i18n/i18nContext'

const Dot = ({ x, y, data, current, units }) => {
    if (current !== null && data.key !== current) {
        return null
    }

    const availableHeight = data.y1 - data.y2
    if (availableHeight < 8 && current === null) return null

    let label = data.value
    if (units === 'percents') {
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

const patterns = [
    {
        id: 'lines',
        type: 'patternLines',
        background: 'inherit',
        color: 'rgba(0, 0, 0, .07)',
        rotation: -45,
        lineWidth: 3,
        spacing: 6
    }
]

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

const StreamChart = ({ data, keys, units, className, current }) => {

    const { translate } = useI18n()

    const horizontalAxis = {
        tickSize: 10,
        tickPadding: 6,
        format: i => this.props.opinions[i].survey
    }

    let tooltipFormat
    if (units === 'percents') {
        tooltipFormat = d => `${d.value}%`
    }

    const getLayerColor = keyIndex => {
        const key = opinions[keyIndex]
        if (current !== null && current !== key) {
            return `${theme.opinionColors[key]}33`
        }
        return theme.opinionColors[key]
    }

    return (
        <div style={{ height: 260 }} className={`StreamChart ${className}`}>
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
                tooltipLabel={d => translate(`opinions.legends_short.${d.id}`)}
                tooltipFormat={tooltipFormat}
                defs={patterns}
                fill={[
                    {
                        match: {
                            id: 'never_heard'
                        },
                        id: 'lines'
                    }
                ]}
            />
        </div>
    )
}

export default StreamChart
