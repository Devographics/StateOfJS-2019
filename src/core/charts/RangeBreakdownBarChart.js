import React, { memo, useMemo } from 'react'
import PropTypes from 'prop-types'
import { ResponsiveBar } from '@nivo/bar'
import { useI18n } from 'core/i18n/i18nContext'
import theme from 'nivoTheme'
import { colors } from '../../constants'

const margin = {
    top: 10,
    right: 52,
    bottom: 50,
    left: 32
}

const Tooltip = memo(({ translate, indexValue, value, data }) => {
    return (
        <>
            {translate(indexValue)}:&nbsp;<strong>{value}%</strong>&nbsp;({data.count})
        </>
    )
})

const RangeBreakdownBarChart = ({ buckets, i18nNamespace }) => {
    const { translate } = useI18n()

    const [translateShort, translateLong] = useMemo(
        () => [
            rangeKey => translate(`${i18nNamespace}.${rangeKey}.short`),
            rangeKey => translate(`${i18nNamespace}.${rangeKey}.long`)
        ],
        [translate, i18nNamespace]
    )

    return (
        <div style={{ height: 260 }}>
            <ResponsiveBar
                data={buckets}
                indexBy="id"
                keys={['percentage']}
                margin={margin}
                padding={0.4}
                theme={theme}
                colors={[colors.blue]}
                labelFormat={v => `${v}%`}
                labelSkipHeight={16}
                enableGridX={false}
                enableGridY={true}
                axisBottom={{ format: translateShort }}
                tooltip={barProps => <Tooltip translate={translateLong} {...barProps} />}
            />
        </div>
    )
}

RangeBreakdownBarChart.propTypes = {
    keys: PropTypes.arrayOf(PropTypes.string).isRequired,
    buckets: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            count: PropTypes.number.isRequired,
            percentage: PropTypes.number
        })
    ),
    i18nNamespace: PropTypes.string.isRequired
}

export default memo(RangeBreakdownBarChart)
