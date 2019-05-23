import React from 'react'
import { colors } from '../../constants'

const ChartLabel = ({
    label,
    fontSize,
    strokeColor = colors.greyDarker,
    fontColor = colors.white
}) => (
    <>
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
    </>
)

export default ChartLabel
