import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { BasicTooltip } from '@nivo/tooltip'

const ParticipationByCountryTooltip = ({ feature }) => {
    if (feature.data === undefined) return null

    return (
        <BasicTooltip
            id={feature.label}
            color={feature.color}
            enableChip={true}
            value={`${feature.data.percentage.toFixed(1)}% (${Math.round(feature.data.count)})`}
        />
    )
}

ParticipationByCountryTooltip.propTypes = {
    feature: PropTypes.object.isRequired
}

export default memo(ParticipationByCountryTooltip)
