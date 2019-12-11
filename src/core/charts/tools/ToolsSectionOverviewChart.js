import React, { useMemo } from 'react'
import { ResponsiveBar } from '@nivo/bar'
import theme from 'nivoTheme'

const margin = {
    top: 81,
    bottom: 30
}

const ToolsSectionOverviewChart = ({ data, units }) => {
    const chartData = useMemo(
        () =>
            data.map(tool => ({
                tool: tool.id,
                ...tool.buckets.reduce(
                    (acc, bucket) => ({
                        ...acc,
                        [bucket.id]: bucket[units]
                    }),
                    {}
                )
            })),
        [data, units]
    )

    let format = v => v
    if (units === 'percentage') {
        format = v => `${v}%`
    }

    return (
        <ResponsiveBar
            margin={margin}
            keys={['would_use', 'would_not_use', 'interested', 'not_interested', 'never_heard']}
            indexBy="tool"
            data={chartData}
            labelTextColor="inherit:darker(2)"
            labelSkipWidth={32}
            labelSkipHeight={20}
            padding={0.6}
            axisTop={{}}
            axisRight={null}
            axisBottom={{}}
            axisLeft={null}
            enableGridY={false}
            theme={theme}
            labelFormat={format}
            tooltipFormat={format}
        />
    )
}

ToolsSectionOverviewChart.propTypes = {}

export default ToolsSectionOverviewChart
