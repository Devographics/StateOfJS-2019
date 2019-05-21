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

const allKeys = ['used_it', 'know_not_used', 'never_heard_not_sure']

const FeaturesOverviewBlock = ({ data }) => {
    console.log(data.features.nodes)

    const sections = data.features.nodes.map(({ section_id, aggregations }) => {
        return {
            id: section_id,
            children: aggregations,
            isSection: true
        }
    })
    // const [currentKeys, setCurrentKeys] = useState([...allKeys])
    // const legendClickHandler = ({ id }) => {
    //     if (currentKeys.length === 1) {
    //         if (currentKeys.includes(id)) {
    //             setCurrentKeys([...allKeys])
    //         } else {
    //             setCurrentKeys([id])
    //         }
    //     } else {
    //         setCurrentKeys([id])
    //     }
    // }

    // const sortedFeatures = sortBy(features, f => f.usage.used_it).reverse()
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
            {/* <FeatureUsageLegends onClick={legendClickHandler} />
            <div className="Features__Overview">
                {sortedFeatures.map(feature => {
                    return (
                        <div key={feature.id} className="Features__Overview__Item">
                            <div>
                                <FeatureUsageWaffleChart feature={feature} keys={currentKeys} />
                            </div>
                            <div className="Features__Overview__Item__Footer">{feature.id}</div>
                        </div>
                    )
                })}
            </div> */}
        </Block>
    )
}

FeaturesOverviewBlock.propTypes = {
    features: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            total: PropTypes.number.isRequired,
            usage: PropTypes.shape({
                used_it: PropTypes.number.isRequired,
                know_not_used: PropTypes.number.isRequired,
                never_heard_not_sure: PropTypes.number.isRequired
            }).isRequired,
            resources: PropTypes.shape({}).isRequired
        })
    ).isRequired
}

export default FeaturesOverviewBlock
