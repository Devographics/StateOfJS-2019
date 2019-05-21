import React, { memo, useMemo } from 'react'
import PropTypes from 'prop-types'
import { ResponsiveBubble } from '@nivo/circle-packing'
import theme from 'nivoTheme'
import { colors } from '../../../constants'
import { ResponsiveSunburst } from '@nivo/sunburst'

const ToolsSunburstChart = ({ data }) => {
    return (
        <div style={{ height: 800 }}>
            <ResponsiveSunburst
                data={data}
                margin={{ top: 40, right: 20, bottom: 20, left: 20 }}
                identity="id"
                value="count"
                cornerRadius={2}
                borderWidth={1}
                borderColor="white"
                // colors={{ scheme: 'nivo' }}
                // childColor={x => {console.log(x); return x.color}}
                childColor={{ from: 'color'}}
                animate={true}
                motionStiffness={90}
                motionDamping={15}
                isInteractive={true}
            />
        </div>
    )
}

// ToolsSunburstChart.propTypes = {
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

export default memo(ToolsSunburstChart)
