import React, { memo, useMemo } from 'react'
import PropTypes from 'prop-types'
import { ResponsiveTreeMap } from '@nivo/treemap'
import theme from 'nivoTheme'
import { colors } from '../../../constants'

const patterns = [
    {
        id: 'dots',
        type: 'patternDots',
        background: colors.teal,
        color: '#6dafb3',
        size: 3,
        padding: 1,
        stagger: true
    }
]

const ToolsTreemapChart = ({ data }) => {
    return (
        <div style={{ height: 800 }}>
            <ResponsiveTreeMap
                theme={theme}
                margin={{
                    top: 2,
                    right: 2,
                    bottom: 2,
                    left: 2
                }}
                identity="id"
                leavesOnly={false}
                padding={5}
                colors={{ scheme: 'nivo' }}
                defs={patterns}
                root={data}
                value="count"
                // nodeComponent={Node}
                animate={false}
            />
        </div>
    )
}

// ToolsTreemapChart.propTypes = {
//     sections: PropTypes.arrayOf(
//         PropTypes.shape({
//             features: PropTypes.arrayOf(
//                 PropTypes.shape({
//                     id: PropTypes.string.isRequired,
//                     usage: PropTypes.shape({
//                         total: PropTypes.number.isRequired,
//                         buckets: PropTypes.arrayOf(
//                             PropTypes.shape({
//                                 id: PropTypes.string.isRequired,
//                                 count: PropTypes.number.isRequired,
//                                 percentage: PropTypes.number.isRequired
//                             })
//                         ).isRequired
//                     }).isRequired
//                 })
//             )
//         })
//     )
// }

export default memo(ToolsTreemapChart)
