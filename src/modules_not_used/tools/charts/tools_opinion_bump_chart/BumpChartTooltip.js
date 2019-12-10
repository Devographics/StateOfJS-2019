import React, { memo } from 'react'

const BumpChartTooltip = ({ tool }) => {
    return <div>{tool.id}</div>
}

export default memo(BumpChartTooltip)
