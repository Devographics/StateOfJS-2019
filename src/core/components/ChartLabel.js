import React from 'react'
import { colors } from 'core/constants.js'

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
                fontWeight: 600
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
                fontWeight: 600
            }}
        >
            {label}
        </text>
    </g>
)

export default ChartLabel
