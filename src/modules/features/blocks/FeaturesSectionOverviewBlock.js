import React from 'react'
import PropTypes from 'prop-types'
import Block from 'core/components/Block'
import FeaturesCirclePackingChart from '../charts/FeaturesCirclePackingChart'

const getChartData = data => {
    const features = data.data.aggregations.map(feature => {
        const usageBucket = feature.usage.buckets.find(b => b.id === 'used_it')
        const knowNotUsedBucket = feature.usage.buckets.find(b => b.id === 'know_not_used')

        return {
            id: feature.id,
            awareness: usageBucket.count + knowNotUsedBucket.count,
            usage: usageBucket.count,
            unusedCount: knowNotUsedBucket.count
        }
    })

    return {
        id: 'root',
        children: features
    }
}

const FeaturesSectionOverviewBlock = ({ block, data }) => {
    const chartData = getChartData(data)

    return (
        <Block id={block.id} showDescription={false}>
            <FeaturesCirclePackingChart data={chartData} />
        </Block>
    )
}

FeaturesSectionOverviewBlock.propTypes = {
    block: PropTypes.shape({
        id: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired
    }).isRequired,
    data: PropTypes.shape({
        data: PropTypes.shape({
            aggregations: PropTypes.arrayOf(
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
        }).isRequired
    }).isRequired
}

export default FeaturesSectionOverviewBlock
