import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { ThemeContext } from 'styled-components'
import { ResponsiveLine } from '@nivo/line'
import { fontFamily } from 'core/constants'

const horizontalAxis = {
    tickSize: 10,
    tickPadding: 6
}

const verticalAxis = {
    tickValues: [1, 5],
    tickPadding: 16,
    renderTick: d => {
        let text = ''
        if (d.value === 1) text = '☹️'
        if (d.value === 5) text = '🙂'
        return (
            <text
                style={{ fontSize: 24 }}
                x={d.x + d.textX}
                y={d.y}
                textAnchor={d.textAnchor}
                alignmentBaseline="middle"
            >
                {text}
            </text>
        )
    }
}

const HappinessChart = ({ data }) => {
    const theme = useContext(ThemeContext)

    const xySerie = data.map(bucket => ({
        x: bucket.year,
        y: bucket.mean
    }))

    return (
        <div style={{ height: 240 }}>
            <ResponsiveLine
                theme={{
                    ...theme.charts,
                    axis: theme.charts.streamTimelineAxis,
                    dots: {
                        text: {
                            fontFamily,
                            fontWeight: 600,
                            fontSize: 12,
                            fill: theme.colors.text
                        }
                    }
                }}
                colors={[theme.colors.lineChartDefaultColor]}
                lineWidth={4}
                margin={{
                    top: 40,
                    right: 60,
                    bottom: 40,
                    left: 60
                }}
                yScale={{
                    type: 'linear',
                    min: 1,
                    max: 5
                }}
                data={[
                    {
                        id: 'Happiness',
                        data: xySerie
                    }
                ]}
                gridYValues={[1, 3, 5]}
                axisTop={horizontalAxis}
                axisRight={verticalAxis}
                axisBottom={horizontalAxis}
                axisLeft={verticalAxis}
                enablePoints
                enablePointLabel
                pointLabelYOffset={4}
                pointSize={42}
                pointColor={theme.colors.background}
                pointBorderColor={theme.colors.lineChartDefaultColor}
                pointBorderWidth={4}
                isInteractive={false}
                animate={false}
            />
        </div>
    )
}

HappinessChart.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            year: PropTypes.number.isRequired,
            mean: PropTypes.number.isRequired
        })
    ).isRequired
}

export default HappinessChart
