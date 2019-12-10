import React from 'react'
import BlockLegends from 'core/blocks/block/BlockLegends'
import { useI18n } from 'core/i18n/i18nContext'
import { opinions as defaultOpinions } from 'core/constants.js'

const ToolOpinionsLegend = props => {
    const { translate } = useI18n()
    const { opinions = defaultOpinions } = props
    const legends = opinions.map(item => ({
        id: item.id,
        label: translate(`opinions.legends.${item.id}`),
        color: item.color
    }))

    return <BlockLegends legends={legends} {...props} />
}

export default ToolOpinionsLegend
