import React, { useMemo } from 'react'
import Block from 'core/blocks/block/Block'
import FeaturesOverviewCirclePackingChart from 'core/charts/features/FeaturesOverviewCirclePackingChart'
import { useI18n } from 'core/i18n/i18nContext'
import { colors, getColor } from 'core/constants.js'
import { useEntities } from 'core/entities/entitiesContext'
import ChartContainer from 'core/charts/ChartContainer'
import variables from '../../../../config/variables.yml'
import get from 'lodash/get'
import compact from 'lodash/compact'

const getChartData = (data, getName, translate) => {
    const categories = variables.featuresCategories
    const sectionIds = Object.keys(categories)
    const sections = sectionIds.map(sectionId => {
        const sectionFeatures = categories[sectionId]
        const features = data
            .filter(f => sectionFeatures.includes(f.id))
            // .filter(a => a.usage !== null)
            .map(feature => {
                const buckets = get(feature, 'experience.year.buckets')
                const usageBucket = buckets.find(b => b.id === 'used')
                const knowNotUsedBucket = buckets.find(b => b.id === 'heard')
                console.log(feature)
                return {
                    id: feature.id,
                    awareness: usageBucket.count + knowNotUsedBucket.count,
                    awarenessColor: colors.teal,
                    usage: usageBucket.count,
                    usageColor: getColor(sectionId),
                    unusedCount: knowNotUsedBucket.count,
                    name: feature.name,
                    sectionId,
                }
            })

        return features.length
            ? {
                  id: sectionId,
                  isSection: true,
                  children: features,
                  name: translate(`page.${sectionId}`)
              }
            : null
    })

    return {
        id: 'root',
        children: compact(sections)
    }
}

const FeaturesOverviewBlock = ({ block, data }) => {
    const { getName } = useEntities()
    const { translate } = useI18n()

    const chartData = useMemo(() => getChartData(data, getName, translate), [
        data,
        getName,
        translate
    ])

    // console.log(chartData)
    // note: slightly different from Usage legend

    return (
        <Block
            block={block}
            data={chartData}
            className="FeaturesOverviewBlock"
            showDescription={true}
        >
            <ChartContainer vscroll={true}>
                <FeaturesOverviewCirclePackingChart
                    className="FeaturesOverviewChart"
                    data={chartData}
                    variant="allFeatures"
                />
            </ChartContainer>
        </Block>
    )
}

export default FeaturesOverviewBlock
