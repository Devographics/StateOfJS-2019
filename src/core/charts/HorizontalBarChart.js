import React, { memo, useMemo } from 'react'
import { sortBy } from 'lodash'
import PropTypes from 'prop-types'
import { ResponsiveBar } from '@nivo/bar'
import theme from 'nivoTheme'
import { useI18n } from 'core/i18n/i18nContext'
import { colors } from '../../constants'

const Tooltip = memo(({ indexValue, value }) => (
    <span>
        {indexValue}
        :&nbsp;
        <strong>{value}</strong>
    </span>
))

const margin = {
    top: 40,
    right: 20,
    bottom: 40,
    left: 240
}

const HorizontalBarChart = ({ buckets, i18nNamespace, translateData }) => {
    const { translate } = useI18n()
    const data = useMemo(
        () =>
            sortBy(buckets.map(bucket => ({ ...bucket })), 'count').map(bucket => {
                if (translateData !== true) return bucket

                return {
                    ...bucket,
                    id: translate(`${i18nNamespace}.${bucket.id}`)
                }
            }),
        [buckets, translate, i18nNamespace, translateData]
    )

    return (
        <div style={{ height: buckets.length * 36 + 80 }}>
            <ResponsiveBar
                layout="horizontal"
                margin={margin}
                keys={['count']}
                data={data}
                theme={theme}
                enableGridX={true}
                enableGridY={false}
                enableLabel={false}
                colors={[colors.blue]}
                padding={0.68}
                borderRadius={5}
                axisTop={{
                    format: '.2s'
                }}
                axisBottom={{
                    format: '.2s'
                }}
                axisLeft={{
                    tickSize: 0,
                    tickPadding: 10
                }}
                tooltip={barProps => <Tooltip {...barProps} />}
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
    translateData: PropTypes.bool.isRequired
}

export default memo(HorizontalBarChart)
