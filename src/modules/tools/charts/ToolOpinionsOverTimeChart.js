import React, { Component } from 'react'
import { ResponsiveStream } from '@nivo/stream'
import theme from 'nivoTheme'
import { opinions } from '../../../constants'
import DisplayModeSwitch from 'core/components/DisplayModeSwitch'
import OpinionsLegends from 'core/charts/OpinionsLegends'
import Trans from 'core/i18n/Trans'

const Dot = ({ x, y, data, current, displayMode }) => {
    if (current !== null && data.key !== current) {
        return null
    }

    const availableHeight = data.y1 - data.y2
    if (availableHeight < 8 && current === null) return null

    let label = data.value
    if (displayMode === 'percents') {
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

const getChartData = data => {
    const chartData = data.map(yearData => {
        const { year, buckets } = yearData
        const yearObject = {
            id: year
        }
        opinions.forEach(opinion => {
            const opinionBucket = buckets.find(b => b.id === opinion.id)
            yearObject[opinion.id] = opinionBucket.percentage
        })
        return yearObject
    })
    return chartData
}

export default class ToolOpinionsOverTimeChart extends Component {
    state = {
        current: null,
        displayMode: 'percents'
    }

    setCurrent = legend => {
        this.setState({ current: legend.id })
    }

    resetCurrent = () => {
        this.setState({ current: null })
    }

    setDisplayMode = displayMode => {
        this.setState({ displayMode })
    }

    getLayerColor = ({ index }) => {
        const { current } = this.state

        const key = opinions[index]
        const color = key.color
        if (current !== null && current !== key) {
            return `${color}33`
        }

        return color
    }

    render() {
        let { data } = this.props
        const { current, displayMode } = this.state

        data = getChartData(data)

        const horizontalAxis = {
            tickSize: 10,
            tickPadding: 6,
            format: i => data[i].id
        }

        let tooltipFormat
        if (displayMode === 'percents') {
            tooltipFormat = d => `${d.value}%`
        }

        return (
            <Trans>
                {translate => (
                    <div className="OverTime__Chart">
                        <div
                            style={{
                                height: 300
                            }}
                        >
                            <ResponsiveStream
                                theme={{
                                    ...theme,
                                    axis: theme.streamTimelineAxis
                                }}
                                offsetType="expand"
                                colors={this.getLayerColor}
                                curve="monotoneX"
                                margin={margin}
                                keys={opinions.map(o => o.id)}
                                data={data}
                                enableGridX={false}
                                enableGridY={false}
                                axisLeft={undefined}
                                axisTop={horizontalAxis}
                                axisBottom={horizontalAxis}
                                enableDots={true}
                                renderDot={d => (
                                    <Dot {...d} current={current} displayMode={displayMode} />
                                )}
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
                        <div>
                            <div className="OverTime__Chart__SwitchContainer">
                                <DisplayModeSwitch
                                    mode={displayMode}
                                    onChange={this.setDisplayMode}
                                />
                            </div>
                            <OpinionsLegends
                                layout="vertical"
                                withFrame={false}
                                onMouseEnter={this.setCurrent}
                                onMouseLeave={this.resetCurrent}
                                style={{
                                    marginTop: 20,
                                    marginBottom: margin.bottom
                                }}
                            />
                        </div>
                    </div>
                )}
            </Trans>
        )
    }
}
