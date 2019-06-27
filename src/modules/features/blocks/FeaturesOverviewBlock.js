import React, { useMemo } from 'react'
import Block from 'core/components/Block'
import FeaturesOverviewCirclePackingChart from '../charts/FeaturesOverviewCirclePackingChart'
import Legends from 'core/charts/Legends'
import { useI18n } from 'core/i18n/i18nContext'
import { colors } from '../../../constants'
import { useEntities } from 'core/entities/entitiesContext'
import ChartContainer from 'core/charts/ChartContainer'

const getChartData = (data, getName, translate) => {
    const sections = data.features.nodes.map(section => {
        const { section_id } = section
        const features = section.aggregations
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
            id: section_id,
            isSection: true,
            children: features,
            name: translate(`page.${section_id}`)
        }
    })

    return {
        id: 'root',
        children: sections
    }
}

const FeaturesOverviewBlock = ({ data }) => {
    const { getName } = useEntities()
    const { translate } = useI18n()

    const chartData = useMemo(() => getChartData(data, getName, translate), [data])

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
        <Block id="features-overview" className="FeaturesOverviewBlock" showDescription={true}>
            <ChartContainer vscroll={true}>
                <FeaturesOverviewCirclePackingChart
                    className="FeaturesOverviewChart"
                    data={chartData}
                    variant="allFeatures"
                />
            </ChartContainer>
            <Legends legends={legends} />
        </Block>
    )
}

export default FeaturesOverviewBlock
