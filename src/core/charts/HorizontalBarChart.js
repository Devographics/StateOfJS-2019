import React, { memo, useMemo } from 'react'
import { sortBy } from 'lodash'
import PropTypes from 'prop-types'
import { ResponsiveBar } from '@nivo/bar'
import theme from 'nivoTheme'
import { useI18n } from 'core/i18n/i18nContext'
import { colors } from '../../constants'
import { useBarFormatters } from './barHooks'
import BarTooltip from './BarTooltip'
import HorizontalBarStripes from './HorizontalBarStripes'

const margin = {
    top: 40,
    right: 20,
    bottom: 50,
    left: 240
}

const HorizontalBarChart = ({ buckets, i18nNamespace, translateData, mode }) => {
    const { translate } = useI18n()
    const { formatTick, formatValue } = useBarFormatters({
        i18nNamespace,
        shouldTranslate: translateData,
        mode
    })
    const data = useMemo(() => sortBy(buckets.map(bucket => ({ ...bucket })), 'count'), [buckets])

    return (
        <div style={{ height: buckets.length * 36 + 80 }}>
            <ResponsiveBar
                layout="horizontal"
                margin={margin}
                keys={[mode]}
                data={data}
                theme={theme}
                enableGridX={true}
                enableGridY={false}
                enableLabel={false}
                colors={[colors.blue]}
                padding={0.68}
                borderRadius={5}
                axisTop={{
                    format: formatValue
                }}
                axisBottom={{
                    format: formatValue,
                    legend: translate(`users_${mode}`),
                    legendPosition: 'middle',
                    legendOffset: 40
                }}
                axisLeft={{
                    format: formatTick,
                    tickSize: 0,
                    tickPadding: 10
                }}
                tooltip={barProps => (
                    <BarTooltip
                        i18nNamespace={i18nNamespace}
                        shouldTranslate={translateData}
                        {...barProps}
                    />
                )}
                layers={[
                    layerProps => <HorizontalBarStripes {...layerProps} />,
                    'grid',
                    'axes',
                    'bars'
                ]}
            />
        </div>
    )
}

HorizontalBarChart.propTypes = {
    buckets: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            count: PropTypes.number.isRequired,
            percentage: PropTypes.number
        })
    ),
    i18nNamespace: PropTypes.string.isRequired,
    translateData: PropTypes.bool.isRequired,
    mode: PropTypes.oneOf(['count', 'percentage']).isRequired
}
HorizontalBarChart.defaultProps = {
    translateData: false,
    mode: 'count'
}

export default memo(HorizontalBarChart)
