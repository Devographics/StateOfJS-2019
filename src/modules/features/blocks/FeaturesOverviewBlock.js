import React, { useMemo } from 'react'
import Block from 'core/components/Block'
import FeaturesCirclePackingOverviewChart from '../charts/FeaturesCirclePackingOverviewChart'
import Legends from 'core/charts/Legends'
import { useI18n } from 'core/i18n/i18nContext'
import { colors } from '../../../constants'

const getChartData = data => {
    const sections = data.features.nodes.map(section => {
        const { section_id } = section
        const features = section.aggregations.map(feature => {
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
            id: section_id,
            isSection: true,
            children: features
        }
    })

    return {
        id: 'root',
        children: sections
    }
}

const FeaturesOverviewBlock = ({ data }) => {
    const chartData = useMemo(() => getChartData(data), [data])

    const { translate } = useI18n()

    // note: slightly different from Usage legend
    const legends = [
        {
            id: 'know_it',
            color: colors.teal,
            label: translate(`features.usage.know_it`)
        },
        {
            id: 'used_it',
            color: colors.blue,
            label: translate(`features.usage.used_it`)
        }
    ]

    return (
        <Block id="features-overview" showDescription={true}>
            <Legends legends={legends} withFrame={false} layout="vertical" />
            <FeaturesCirclePackingOverviewChart data={chartData} />
        </Block>
    )
}

export default FeaturesOverviewBlock
