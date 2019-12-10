import React from 'react'
import Legends from 'core/blocks/block/BlockLegends'
import { useI18n } from 'core/i18n/i18nContext'
import { usage } from 'core/constants.js'

const FeatureUsageLegends = props => {
    const { translate } = useI18n()

    const legends = usage.map(item => ({
        id: item.id,
        label: translate(`features.usage.${item.id}`),
        color: item.color
    }))

    return <Legends legends={legends} {...props} />
}

export default FeatureUsageLegends
