import React from 'react'
import PropTypes from 'prop-types'
import Block from 'core/components/Block'
import FeaturesCirclePackingChart from '../charts/FeaturesCirclePackingChart'
import { useEntities } from 'core/entities/entitiesContext'
import { colors } from '../../../constants'

const getChartData = (data, getName) => {
    const features = data.data.aggregations
        .filter(a => a.usage !== null)
        .map(feature => {
            const usageBucket = feature.usage.buckets.find(b => b.id === 'used_it')
            const knowNotUsedBucket = feature.usage.buckets.find(b => b.id === 'know_not_used')

            return {
                id: feature.id,
                awareness: usageBucket.count + knowNotUsedBucket.count,
                awarenessColor: colors.teal,
                usage: usageBucket.count,
                usageColor: colors.blue,
                unusedCount: knowNotUsedBucket.count,
                name: getName(feature.id)
            }
        })

    return {
        id: 'root',
        children: features
    }
}

const FeaturesSectionOverviewBlock = ({ block, data }) => {
    const { getName } = useEntities()
    const { id, showDescription = true } = block
    const chartData = getChartData(data, getName)

    return (
        <Block id={id} showDescription={showDescription}>
            <FeaturesCirclePackingChart className="FeaturesSectionOverviewChart" data={chartData} />
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
                    })
                })
            )
        }).isRequired
    }).isRequired
}

export default FeaturesSectionOverviewBlock
