import React from 'react'
import { colors } from '../../constants.js'

const Cell = ({ px = 0, py = 0, text, color, variant = 'full' }) => (
    <g transform={`translate(${px * 98 + 1},${py * 98 + 1})`}>
        <rect
            width="98"
            height="98"
            stroke={colors.greyDark}
            strokeWidth="1.75"
            shapeRendering="crispEdges"
        />
        <text
            fill={colors.greyMediumer}
            x="20"
            y="20"
            textAnchor="middle"
            alignmentBaseline="middle"
            fontWeight="normal"
            fontSize={18}
        >
            {px + py * 5}
        </text>
        <text
            x="49"
            y="55"
            fill={color}
            textAnchor="middle"
            alignmentBaseline="middle"
            fontWeight={800}
            fontSize={36}
        >
            {text}
        </text>
    </g>
)

export default Cell
