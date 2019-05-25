import React, { memo } from 'react'
import { colors } from '../../constants'

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
                fill={colors.backgroundDark}
                opacity={0.4}
            />
        )
    })
}

export default memo(HorizontalBarStripes)
