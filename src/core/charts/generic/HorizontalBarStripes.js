import React, { memo } from 'react'
import { getColor } from 'core/constants.js'

const HorizontalBarStripes = ({ bars, width, yScale }) => {
    const step = yScale.step()

    return bars.map((bar, i) => {
        if (i % 2 !== 0) return null

        return (
            <rect
                key={bar.key}
                y={bar.y + bar.height / 2 - step / 2}
                width={width}
                height={step}
                fill={getColor('stripe')}
            />
        )
    })
}

export default memo(HorizontalBarStripes)
