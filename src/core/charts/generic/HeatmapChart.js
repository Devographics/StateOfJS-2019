import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import { scaleLinear } from 'd3-scale'
import { colors } from 'core/constants.js'
import { useI18n } from 'core/i18n/i18nContext'
import HeatmapChartRow from 'core/charts/generic/HeatmapChartRow'
import tinycolor from 'tinycolor2'

// accepts either a number of steps and an offset for regular steps,
// or a specified array of alpha steps
const getAlphaScale = (color, alphaSteps, startOffset) => {
    const a = Array.isArray(alphaSteps) ? alphaSteps : Array.from({ length: alphaSteps })
    return a.map((step, i) => {
        const c = tinycolor(color)
        c.setAlpha(step ? step : startOffset + ((1 - startOffset) * i) / alphaSteps)
        const cs = c.toRgbString()
        return cs
    })
}

const backgroundColorScale = scaleLinear()
    .domain([0, 10, 20, 30, 40])
    .range(getAlphaScale(colors.teal, 5, 0.3))

const textColorScale = scaleLinear()
    .domain([0, 10, 20, 30, 40])
    .range([
        colors.greyDarkish,
        colors.greyDarkish,
        colors.greyDarkish,
        colors.greyDarkish,
        colors.greyDarkish
    ])

const HeatmapChart = ({ keys, data, i18nNamespace }) => {
    const { translate } = useI18n()
    const [currentIndex, setCurrentIndex] = useState(null)

    return (
        <>
            <div
                className="Heatmap"
                style={{
                    gridTemplateColumns: `auto ${'70px '.repeat(keys.length)}`
                }}
            >
                <div className="Heatmap__Legend">{translate(`${i18nNamespace}.axis_legend`)}</div>
                {keys.map(key => {
                    return (
                        <div key={key} className="Heatmap__Header">
                            {translate(`${i18nNamespace}.${key}.shorter`)}
                        </div>
                    )
                })}
                {data.map((bucket, i) => (
                    <HeatmapChartRow
                        key={bucket.id}
                        item={bucket}
                        keys={keys}
                        index={i}
                        backgroundColorScale={backgroundColorScale}
                        textColorScale={textColorScale}
                        setCurrent={setCurrentIndex}
                        isActive={currentIndex === i}
                        isInactive={currentIndex !== null && currentIndex !== i}
                        isEven={i % 2 === 0}
                    />
                ))}
                <div className="Heatmap__ColorLegend__Label"></div>
                <div
                    className="Heatmap__ColorLegend"
                    style={{
                        gridColumnEnd: keys.length + 1
                    }}
                >
                    <span
                        className="Heatmap__ColorLegend__Cell"
                        style={{
                            borderColor: backgroundColorScale(0)
                        }}
                    >
                        0
                    </span>
                    <span
                        className="Heatmap__ColorLegend__Cell"
                        style={{
                            borderColor: backgroundColorScale(10)
                        }}
                    >
                        10%
                    </span>
                    <span
                        className="Heatmap__ColorLegend__Cell"
                        style={{
                            borderColor: backgroundColorScale(20)
                        }}
                    >
                        20%
                    </span>
                    <span
                        className="Heatmap__ColorLegend__Cell"
                        style={{
                            borderColor: backgroundColorScale(20)
                        }}
                    >
                        30%
                    </span>
                    <span
                        className="Heatmap__ColorLegend__Cell"
                        style={{
                            borderColor: backgroundColorScale(40)
                        }}
                    >
                        40%
                    </span>
                </div>
            </div>
        </>
    )
}

HeatmapChart.propTypes = {
    keys: PropTypes.arrayOf(PropTypes.string).isRequired,
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            ranges: PropTypes.arrayOf(
                PropTypes.shape({
                    range: PropTypes.string.isRequired,
                    count: PropTypes.number.isRequired,
                    percentage: PropTypes.number.isRequired
                })
            ).isRequired
        })
    ).isRequired,
    i18nNamespace: PropTypes.string.isRequired
}

export default memo(HeatmapChart)
