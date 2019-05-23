import React from 'react'
import PropTypes from 'prop-types'
import { ResponsiveWaffleCanvas } from '@nivo/waffle'
import theme from 'nivoTheme'
import ChartRatioContainer from 'core/charts/ChartRatioContainer'
import { useI18n } from 'core/i18n/i18nContext'
import GenderLegends from './GendersLegends'

const rows = 32
const columns = 128

const GenderBreakdownWaffleChart = ({ data }) => {
    const { translate } = useI18n()

    let total = 0
    const colors = []
    const translatedData = data.map(bucket => {
        colors.push(theme.genderColors[bucket.id])
        total += bucket.count

        return {
            id: bucket.id,
            label: translate(`gender.${bucket.id}`),
            value: bucket.count
        }
    })

    return (
        <>
            <GenderLegends />
            <div className="GenderBreakdown__Chart">
                <ChartRatioContainer ratio={rows / columns} maxHeight={260}>
                    <ResponsiveWaffleCanvas
                        total={total}
                        rows={rows}
                        columns={columns}
                        data={translatedData}
                        fillDirection="left"
                        theme={theme}
                        colors={colors}
                    />
                </ChartRatioContainer>
            </div>
        </>
    )
}

GenderBreakdownWaffleChart.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            count: PropTypes.number.isRequired
        })
    ).isRequired
}

export default GenderBreakdownWaffleChart
