import React, { memo } from 'react'
import { ResponsiveWaffleCanvas } from '@nivo/waffle'
import { useI18n } from 'core/i18n/i18nContext'
import theme from 'nivoTheme'
import ChartRatioContainer from 'core/charts/ChartRatioContainer'
import SourceLegends from './SourceLegends'

const rows = 32
const columns = 128

const SourceBreakdownWaffleChart = ({ data }) => {
    const { translate } = useI18n()

    let total = 0
    const colors = []
    const translatedData = data.map(bucket => {
        colors.push(theme.genderColors[bucket.id])
        total += bucket.count

        return {
            id: bucket.id,
            label: translate(`source.${bucket.id}`),
            value: bucket.count
        }
    })

    return (
        <>
            <SourceLegends sources={translatedData} />
            <div className="SourceBreakdown__Chart">
                <ChartRatioContainer ratio={rows / columns} maxHeight={260}>
                    <ResponsiveWaffleCanvas
                        total={total}
                        rows={rows}
                        columns={columns}
                        data={translatedData}
                        fillDirection="left"
                        theme={theme}
                        colors={{ scheme: 'greens' }}
                    />
                </ChartRatioContainer>
            </div>
        </>
    )
}

export default memo(SourceBreakdownWaffleChart)
