import React from 'react'
import Legends from 'core/charts/Legends'
import { useI18n } from 'core/i18n/i18nContext'
import { opinions } from '../../../constants'

const ToolOpinionsLegend = props => {
    const { translate } = useI18n()

    const legends = opinions.map(item => ({
        id: item.id,
        label: translate(`opinions.legends.${item.id}`),
        color: item.color
    }))

    return <Legends legends={legends} {...props} />
}

export default ToolOpinionsLegend
