import React, { memo, useContext } from 'react'
import { ThemeContext } from 'styled-components'

const HorizontalBarStripes = ({ bars, width, yScale }) => {
    const theme = useContext(ThemeContext)

    const step = yScale.step()

    return bars.map((bar, i) => {
        if (i % 2 !== 0) return null

        return (
            <rect
                key={bar.key}
                y={bar.y + bar.height / 2 - step / 2}
                width={width}
                height={step}
                fill={theme.colors.backgroundAlt}
            />
        )
    })
}

export default memo(HorizontalBarStripes)
