import React, { Fragment, memo } from 'react'
import PropTypes from 'prop-types'
import { scaleLinear } from 'd3-scale'
import { colors } from '../../constants'
import { useI18n } from 'core/i18n/i18nContext'

const colorScale = scaleLinear()
    .domain([0, 100])
    .range([colors.pinkLighter, colors.blue])

const HeatmapChart = ({ keys, items, i18nNamespace }) => {
    const { translate } = useI18n()

    return (
        <div
            className="Heatmap"
            style={{
                gridTemplateColumns: `auto ${'60px '.repeat(keys.length)}`
            }}
        >
            <div className="Heatmap__Legend">
                {translate(`${i18nNamespace}.axis_legend`)}
            </div>
            {keys.map(key => {
                return (
                    <div key={key} className="Heatmap__Header">
                        {translate(`${i18nNamespace}.${key}.short`)}
                    </div>
                )
            })}
            {items.map((item, i) => {
                const isLast = i === items.length - 1

                return (
                    <Fragment key={item.id}>
                        <div className={`Heatmap__Subject${isLast ? ` Heatmap__Subject--last` : ''}`}>
                            {item.name}
                        </div>
                        {keys.map(key => {
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
    keys: PropTypes.arrayOf(
        PropTypes.string
    ).isRequired,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        })
    ).isRequired,
    i18nNamespace: PropTypes.string.isRequired,
}

export default memo(HeatmapChart)
