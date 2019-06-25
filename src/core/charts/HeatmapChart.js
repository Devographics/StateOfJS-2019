import React, { Fragment, memo } from 'react'
import PropTypes from 'prop-types'
import { scaleLinear } from 'd3-scale'
import { colors } from '../../constants'

const colorScale = scaleLinear()
    .domain([0, 100])
    .range([colors.teal, colors.blue])

const HeatmapChart = ({ bucketKeys, items }) => {
    return (
        <div
            className="Heatmap"
            style={{
                gridTemplateColumns: `auto ${'60px '.repeat(bucketKeys.length)}`
            }}
        >
            <span/>
            {bucketKeys.map(key => {
                return (
                    <div key={key} className="Heatmap__Header">
                        {key}
                    </div>
                )
            })}
            {items.map((item, i) => {
                const isLast = i === items.length - 1

                return (
                    <Fragment key={item.id}>
                        <div className={`Heatmap__Subject${isLast ? ` Heatmap__Subject--last` : ''}`}>
                            {item.id}
                        </div>
                        {bucketKeys.map(key => {
                            const value = item[key].relative_percentage

                            return (
                                <div
                                    key={key}
                                    className={`Heatmap__Cell${isLast ? ` Heatmap__Cell--last` : ''}`}
                                    style={{
                                        background: colorScale(value)
                                    }}
                                >
                                    {value}%
                                </div>
                            )
                        })}
                    </Fragment>
                )
            })}
        </div>
    )
}

HeatmapChart.propTypes = {
    bucketKeys: PropTypes.arrayOf(
        PropTypes.string
    ).isRequired,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
        })
    ).isRequired,
}

export default memo(HeatmapChart)
