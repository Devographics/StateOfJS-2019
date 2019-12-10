import React from 'react'
import Legends from 'core/blocks/block/BlockLegends'
import { useI18n } from 'core/i18n/i18nContext'
import { featureExperience } from 'core/constants.js'

const FeatureExperienceLegends = props => {
    const { translate } = useI18n()

    const legends = featureExperience.map(item => ({
        id: item.id,
        label: translate(`features.usage.${item.id}`),
        color: item.color
    }))

    return <Legends legends={legends} {...props} />
}

export default FeatureExperienceLegends
