import React, { memo, useMemo } from 'react'
import PropTypes from 'prop-types'
import theme from 'nivoTheme'
import { ResponsiveScatterPlot } from '@nivo/scatterplot'

const FeaturesScatterplotChart = ({ features }) => {
    const max = useMemo(() => Math.max(...features.map(feature => feature.usage.total)), features)
    const data = useMemo(() => {
        return features.map(feature => {
            const usageBucket = feature.usage.buckets.find(b => b.id === 'used_it')
            const knowNotUsedBucket = feature.usage.buckets.find(b => b.id === 'know_not_used')

            return {
                featureId: feature.id,
                x: usageBucket.count,
                y: usageBucket.count + knowNotUsedBucket.count
            }
        })
    }, [features])

    return (
        <>
            <h4>usage &amp; awareness scatterplot?</h4>
            <div style={{ height: 400 }}>
                <ResponsiveScatterPlot
                    theme={theme}
                    margin={{
                        top: 20,
                        right: 20,
                        bottom: 80,
                        left: 80
                    }}
                    colors={['#3c52d1', '#5dd6da', '#cccccc']}
                    xScale={{
                        type: 'linear',
                        min: 0,
                        max
                    }}
                    yScale={{
                        type: 'linear',
                        min: 0,
                        max
                    }}
                    axisLeft={{
                        format: '.2s',
                        tickPadding: 14,
                        legend: 'awareness',
                        legendPosition: 'middle',
                        legendOffset: -60
                    }}
                    axisBottom={{
                        format: '.2s',
                        tickPadding: 14,
                        legend: 'usage',
                        legendPosition: 'middle',
                        legendOffset: 54
                    }}
                    symbolSize={24}
                    data={[{ id: 'stats', data }]}
                    tooltip={d => <strong>{d.featureId}</strong>}
                />
            </div>
        </>
    )
}

FeaturesScatterplotChart.propTypes = {
    features: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            usage: PropTypes.shape({
                total: PropTypes.number.isRequired,
                buckets: PropTypes.arrayOf(
                    PropTypes.shape({
                        id: PropTypes.string.isRequired,
                        count: PropTypes.number.isRequired,
                        percentage: PropTypes.number.isRequired
                    })
                ).isRequired
            }).isRequired
        })
    )
}

export default memo(FeaturesScatterplotChart)
