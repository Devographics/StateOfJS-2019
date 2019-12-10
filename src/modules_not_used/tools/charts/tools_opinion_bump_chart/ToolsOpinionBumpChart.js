import React, { memo, useMemo } from 'react'
import PropTypes from 'prop-types'
import theme from 'nivoTheme'
import ResponsiveBumpChart from './ResponsiveBumpChart'
import compact from 'lodash/compact'
import sortBy from 'lodash/sortBy'

const ToolsOpinionBumpChart = ({ data }) => {
    const computedData = useMemo(() => {
        let computed = data.map(tool => {
            if (!tool) {
                return null
            }
            const neverHeard = tool.opinion.buckets.find(bucket => bucket.id === 'never_heard')
            const interested = tool.opinion.buckets.find(bucket => bucket.id === 'interested')
            const notInterested = tool.opinion.buckets.find(
                bucket => bucket.id === 'not_interested'
            )
            const wouldUse = tool.opinion.buckets.find(bucket => bucket.id === 'would_use')
            const wouldNotUse = tool.opinion.buckets.find(bucket => bucket.id === 'would_not_use')
            return {
                id: tool.id,
                awareness: tool.opinion.total - neverHeard.count,
                interest: interested.count / (interested.count + notInterested.count),
                satisfaction: wouldUse.count / (wouldUse.count + wouldNotUse.count)
            }
        })

        computed = compact(computed)

        sortBy(computed, 'awareness')
            .reverse()
            .forEach((tool, i) => {
                tool.awarenessRank = i + 1
            })
        sortBy(computed, 'interest')
            .reverse()
            .forEach((tool, i) => {
                tool.interestedRank = i + 1
            })
        sortBy(computed, 'satisfaction')
            .reverse()
            .forEach((tool, i) => {
                tool.satisfactionRank = i + 1
            })

        return computed
    }, [data])

    return (
        <div
            style={{
                height: computedData.length * 40 + 60
            }}
        >
            <ResponsiveBumpChart
                tools={computedData}
                margin={{
                    top: 30,
                    right: 10,
                    bottom: 30,
                    left: 160
                }}
                theme={theme}
                animate={false}
            />
        </div>
    )
}

ToolsOpinionBumpChart.propTypes = {
    data: PropTypes.array.isRequired
}

export default memo(ToolsOpinionBumpChart)
