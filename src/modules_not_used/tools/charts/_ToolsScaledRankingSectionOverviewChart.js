import React, { memo } from 'react'
import { ResponsiveAreaBump } from '@nivo/bump'
import PropTypes from 'prop-types'
import theme from 'nivoTheme'
import { distinctColors } from 'core/constants.js'

const ToolsScaledRankingSectionOverviewChart = ({ data }) => {
    return (
        <div
            style={{
                height: data.length * 52 + 60
            }}
        >
            <ResponsiveAreaBump
                margin={{
                    top: 30,
                    right: 140,
                    bottom: 30,
                    left: 140
                }}
                spacing={4}
                colors={distinctColors}
                blendMode="screen"
                startLabel="id"
                startLabelTextColor={{
                    from: 'color',
                    modifiers: [['brighter', 1.6]]
                }}
                endLabel="id"
                endLabelTextColor={{
                    from: 'color',
                    modifiers: [['brighter', 1.6]]
                }}
                data={data}
                theme={theme}
                animate={true}
            />
        </div>
    )
}

ToolsScaledRankingSectionOverviewChart.propTypes = {
    data: PropTypes.array.isRequired
}

export default memo(ToolsScaledRankingSectionOverviewChart)
