import React from 'react'
import { ResponsiveWrapper } from '@nivo/core'
import BumpChart from './BumpChart'

const ResponsiveBumpChart = props => (
    <ResponsiveWrapper>
        {({ width, height }) => <BumpChart width={width} height={height} {...props} />}
    </ResponsiveWrapper>
)

export default ResponsiveBumpChart
