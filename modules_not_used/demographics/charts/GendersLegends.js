import React, { memo, useMemo } from 'react'
import Legends from 'core/blocks/block/BlockLegends'
import { useI18n } from 'core/i18n/i18nContext'
import { keys, getColor } from 'core/constants.js'

const GenderLegends = ({ data, units }) => {
    const { translate } = useI18n()

    const keysGender = keys.gender
    const legends = useMemo(
        () =>
            keysGender.map(gender => ({
                id: gender,
                label: translate(`gender.${gender}`),
                color: getColor(gender)
            })),
        [translate, keysGender]
    )

    return <Legends legends={legends} modifier="horizontal" data={data} units={units} />
}

export default memo(GenderLegends)
