import React from 'react'
import PropTypes from 'prop-types'
import { ResponsiveBump } from '@nivo/bump'
import theme from 'nivoTheme'

const ToolsExperienceRankingChart = ({ data }) => {

    return (
        <ResponsiveBump
            data={data}
            margin={{ top: 40, right: 100, bottom: 40, left: 100 }}
            colors={{ scheme: 'accent' }}
            lineWidth={5}
            activeLineWidth={8}
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
            pointSize={12}
            activePointSize={20}
            inactivePointSize={12}
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
                    y: PropTypes.number.isRequired,
                    percentage: PropTypes.number.isRequired
                })
            ).isRequired
        })
    ).isRequired
}

export default ToolsExperienceRankingChart
