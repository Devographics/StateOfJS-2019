import React, { memo, useMemo } from 'react'
import theme from 'nivoTheme'
import Legends from 'core/charts/Legends'
import { useI18n } from 'core/i18n/i18nContext'
import { keys } from '../../../constants'

const GenderLegends = ({ data, units }) => {
    const { translate } = useI18n()

    const keysGender = keys.gender
    const { genderColors } = theme
    const legends = useMemo(
        () =>
            keysGender.map(gender => ({
                id: gender,
                label: translate(`gender.${gender}`),
                color: genderColors[gender]
            })),
        [translate, keysGender, genderColors]
    )

    return <Legends legends={legends} modifier="horizontal" data={data} units={units} />
}

export default memo(GenderLegends)
