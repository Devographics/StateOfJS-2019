import React from 'react'
import PropTypes from 'prop-types'
import { ResponsiveBump } from '@nivo/bump'
import theme from 'nivoTheme'
import { colors } from 'core/constants'
// import get from 'lodash/get'

const CustomPoint = props => {
    const { x, y, data, isInactive, size, color, borderColor, borderWidth } = props

    return (
        <g transform={`translate(${x}, ${y})`} style={{ pointerEvents: 'none' }}>
            <circle r={(size + borderWidth) / 2} cy={size / 5} fill="rgba(0, 0, 0, .2)" />
            <circle
                r={size / 2}
                fill={colors.greyDarker}
                stroke={borderColor}
                strokeWidth={borderWidth}
            />
            {!isInactive && (
                <text textAnchor="middle" y={4} fill={color} fontSize="11px">
                    {Math.round(data.percentage)}%
                </text>
            )}
        </g>
    )
}

const ToolsExperienceRankingChart = ({ data }) => {
    // const formatTick = id => {
    //     const tool = data.find(t => t.id === id)
    //     return get(tool, 'entity.name', id)
    // }

    return (
        <ResponsiveBump
            data={data}
            margin={{ top: 40, right: 100, bottom: 40, left: 100 }}
            colors={{ scheme: 'accent' }}
            inactiveLineWidth={5}
            theme={theme}
            enableGridX={true}
            enableGridY={false}
            axisTop={{
                tickSize: 0,
                tickPadding: 9
            }}
            axisRight={null}
            axisBottom={{
                tickSize: 0,
                tickPadding: 9
            }}
            axisLeft={null}
            startLabel={true}
            startLabelTextColor={{
                from: 'color',
                modifiers: [['brighter', 1]]
            }}
            startLabelPadding={20}
            endLabel={true}
            endLabelTextColor={{
                from: 'color',
                modifiers: [['brighter', 1]]
            }}
            endLabelPadding={20}
            pointComponent={CustomPoint}
            pointColor={{ from: 'serie.color', modifiers: [['brighter', 2]] }}
            lineWidth={5}
            pointSize={36}
            pointBorderWidth={3}
            pointBorderColor={{ from: 'serie.color' }}
            activeLineWidth={8}
            activePointSize={42}
            activePointBorderWidth={4}
            inactivePointSize={0}
            inactivePointBorderWidth={2}
        />
    )
}

ToolsExperienceRankingChart.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            data: PropTypes.arrayOf(
                PropTypes.shape({
                    x: PropTypes.number.isRequired,
                    y: PropTypes.number,
                    percentage: PropTypes.number
                })
            ).isRequired
        })
    ).isRequired
}

export default ToolsExperienceRankingChart
