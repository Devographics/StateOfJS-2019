import React from 'react'
import Legends from 'core/charts/Legends'
import { useI18n } from 'core/i18n/i18nContext'
import { colors } from '../../../constants'
// import { opinions } from '../../../constants'

const ToolOpinionsLegend = props => {
    const { translate } = useI18n()

    // with pills
    // const getColor = id => opinions.find(o => o.id === id).color
    // const l = (id, color) => `<span style="background: ${color || getColor(id)};" class="text-highlight">${translate(`opinions.legends_extrashort.${id}`)}</span>`

    // without pills
    const l = (id, color) => translate(`opinions.legends_extrashort.${id}`)

    const legends = [
        {
            id: 'awareness',
            label: `(${l('total_respondents', colors.greyDark)} - ${l('never_heard')})/${l(
                'total_respondents',
                colors.greyDark
            )}`,
            keyLabel: translate('opinions.legends.awareness_ratio')
        },
        {
            id: 'interest',
            label: `${l('interested')}/(${l('interested')} + ${l('not_interested')})`,
            keyLabel: translate('opinions.legends.interest_ratio')
        },
        {
            id: 'satisfaction',
            label: `${l('would_use')}/(${l('would_use')} + ${l('would_not_use')})`,
            keyLabel: translate('opinions.legends.satisfaction_ratio')
        }
    ]

    return <Legends legends={legends} layout="vertical" {...props} />
}

export default ToolOpinionsLegend
