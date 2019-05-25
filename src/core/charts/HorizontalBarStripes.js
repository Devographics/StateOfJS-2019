import React, { memo } from 'react'

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
                fill="black"
                opacity={0.1}
            />
        )
    })
}

export default memo(HorizontalBarStripes)
