import React, { memo } from 'react'
import { ResponsiveChoropleth } from '@nivo/geo'
import countries from 'data/geo/world_countries'
import baseTheme from 'nivoTheme'
import { colors, getColor } from 'core/constants.js'

const theme = {
    ...baseTheme,
    background: getColor('stripe')
}

const features = countries.features.map(feature => {
    return {
        ...feature,
        id: feature.properties.name
    }
})

const colorRange = [
    colors.teal,
    colors.tealLight,
    colors.tealLighter,
    colors.redLighter,
    colors.red,
    colors.redDark,
    colors.redDarker
]

const ParticipationByCountryChart = ({ data, units }) => {
    return (
        <ResponsiveChoropleth
            features={features}
            data={data}
            value={units}
            valueFormat={v => (units === 'percentage' ? `${v.toFixed(1)}%` : Math.round(v))}
            domain={units === 'percentage' ? [0, 8] : [0, 700]}
            colors={colorRange}
            unknownColor={colors.greyMediumer}
            projectionScale={118}
            projectionTranslation={[0.5, 0.7]}
            projectionRotation={[-11, 0, 0]}
            theme={theme}
            borderWidth={0.5}
            borderColor={{ theme: 'background' }}
            animate={false}
            legends={[
                {
                    anchor: 'bottom-left',
                    direction: 'column',
                    translateX: 30,
                    translateY: -30,
                    itemsSpacing: 0,
                    itemWidth: 100,
                    itemHeight: 18,
                    itemDirection: 'left-to-right',
                    itemTextColor: colors.tealLight,
                    symbolSize: 18
                }
            ]}
        />
    )
}

export default memo(ParticipationByCountryChart)
