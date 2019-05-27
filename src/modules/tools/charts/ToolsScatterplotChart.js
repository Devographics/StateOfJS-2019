import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { ResponsiveBubble } from '@nivo/circle-packing'
import theme from 'nivoTheme'
import { ResponsiveScatterPlot } from '@nivo/scatterplot'
import { colors } from '../../../constants'
import { useI18n } from 'core/i18n/i18nContext'

const ToolsScatterplotChart = ({ data }) => {
    const { translate } = useI18n()

    return (
        <div style={{ height: 600 }}>
            <ResponsiveScatterPlot
                data={data}
                margin={{ top: 60, right: 140, bottom: 70, left: 90 }}
                xScale={{ type: 'linear', min: 0, max: 'auto' }}
                yScale={{ type: 'linear', min: 0, max: 'auto' }}
                symbolSize={16}
                theme={theme}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    orient: 'bottom',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: translate('users_count'),
                    legendPosition: 'middle',
                    legendOffset: 46
                }}
                axisLeft={{
                    orient: 'left',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: translate('satisfaction_percentage'),
                    legendPosition: 'middle',
                    legendOffset: -60
                }}
                colors={dot => dot.serie.color}
                animate={false}
                tooltip={({ id, serie, x, y, color }) => {
                    const dot = serie.data.find(d => d.data.x === x)
                    const dotId = dot && dot.data && dot.data.id
                    return (
                        <span>
                            <strong>
                                {dotId} ({serie.id})
                            </strong>
                            : {`${x} ${translate('users')},  ${y}${translate('percent_satisfaction')}`}
                        </span>
                    )
                }}
                // legends={[
                //     {
                //         anchor: 'bottom-right',
                //         direction: 'column',
                //         translateX: 130,
                //         itemWidth: 100,
                //         itemHeight: 12,
                //         itemsSpacing: 5,
                //         itemTextColor: '#999',
                //         symbolSize: 12,
                //         symbolShape: 'circle',
                //         effects: [
                //             {
                //                 on: 'hover',
                //                 style: {
                //                     itemTextColor: '#000'
                //                 }
                //             }
                //         ]
                //     }
                // ]}
            />
        </div>
    )
}

// ToolsScatterplotChart.propTypes = {
//     data: PropTypes.shape({
//         id: PropTypes.string.isRequired,
//         data: PropTypes.arrayOf(
//             PropTypes.shape({
//                 id: PropTypes.string.isRequired,
//                 x: PropTypes.number.isRequired,
//                 y: PropTypes.number.isRequired
//             })
//         )
//     }).isRequired
// }

export default memo(ToolsScatterplotChart)
