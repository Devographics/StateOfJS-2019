import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Block from 'core/components/Block'
import FeatureUsageWaffleChart from '../charts/FeatureUsageWaffleChart'
import FeatureUsageLegends from '../charts/FeatureUsageLegends'
import FeaturesCirclePackingOverviewChart from '../charts/FeaturesCirclePackingOverviewChart'
import Legends from 'core/charts/Legends'
import { usage } from '../../../constants'
import { useI18n } from 'core/i18n/i18nContext'
import sortBy from 'lodash/sortBy'

const FeaturesOverviewBlock = ({ data }) => {

    const sections = data.features.nodes.map(({ section_id, aggregations }) => {
        return {
            id: section_id,
            children: aggregations,
            isSection: true
        }
    })

    const { translate } = useI18n()

    const legends = usage.filter(l => l.id !== 'never_heard_not_sure').map(item => ({
        id: item.id,
        label: translate(`features.usage.${item.id}`),
        color: item.color
    }))

    return (
        <Block id="features-overview" showDescription={true}>
            <Legends legends={legends} withFrame={false} layout="vertical"/>
            <FeaturesCirclePackingOverviewChart sections={sections} />
        </Block>
    )
}

export default FeaturesOverviewBlock
