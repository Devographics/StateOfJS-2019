import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { colors } from 'core/constants'

/**
 * This component is used to render a custom label for charts,
 * its main advantage is to add an outline to the labels so
 * they are more legible.
 */
const ChartLabel = ({
    label,
    fontSize = 13,
    strokeColor = colors.greyDarker,
    fontColor = colors.white,
    ...rest
}) => (
    <g {...rest}>
        <text
            textAnchor="middle"
            dominantBaseline="central"
            stroke={strokeColor}
            strokeWidth={4}
            strokeLinejoin="round"
            style={{
                pointerEvents: 'none',
                fontSize,
                fontWeight: 400,
                opacity: 0.85
            }}
        >
            {label}
        </text>
        <text
            textAnchor="middle"
            dominantBaseline="central"
            fill={fontColor}
            style={{
                pointerEvents: 'none',
                fontSize,
                fontWeight: 400
            }}
        >
            {label}
        </text>
    </g>
)

ChartLabel.propTypes = {
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    fontSize: PropTypes.number,
    strokeColor: PropTypes.string,
    fontColor: PropTypes.string
}

export default memo(ChartLabel)
