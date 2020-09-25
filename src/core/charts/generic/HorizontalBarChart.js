import React, { memo, useMemo, useContext } from 'react'
import PropTypes from 'prop-types'
import { ThemeContext } from 'styled-components'
import sortBy from 'lodash/sortBy'
import round from 'lodash/round'
import { ResponsiveBar } from '@nivo/bar'
import { useI18n } from 'core/i18n/i18nContext'
import { fontFamily } from 'core/constants'
import { useBarChart } from 'core/charts/hooks'
import BarTooltip from 'core/charts/generic/BarTooltip'
import HorizontalBarStripes from './HorizontalBarStripes'

const labelMaxLength = 13

const margin = {
    top: 40,
    right: 20,
    bottom: 50,
    left: 140
}

const Text = ({ hasLink = false, label }) => {
    const theme = useContext(ThemeContext)
    const shortenLabel = label.length > labelMaxLength
    const shortLabel = shortenLabel ? label.substr(0, labelMaxLength) + '…' : label

    return (
        <text
            dominantBaseline="central"
            textAnchor="end"
            transform="translate(-10,0) rotate(0)"
            style={{
                fill: hasLink ? theme.colors.link : theme.colors.text,
                fontSize: 14,
                fontFamily
            }}
        >
            <title>{label}</title>
            {shortLabel || label}
        </text>
    )
}

const TickItem = tick => {
    const { translate } = useI18n()

    const { x, y, value, shouldTranslate, i18nNamespace, entity } = tick

    let label, link

    label = shouldTranslate ? translate(`${i18nNamespace}.${value}.short`) : value

    if (entity) {
        const { name, homepage, github } = entity
        if (name) {
            label = name
        }
        link = homepage || (github && github.url)
    }

    return (
        <g transform={`translate(${x},${y})`}>
            {link ? (
                <a href={link}>
                    <Text hasLink={true} label={label} />
                </a>
            ) : (
                <Text hasLink={false} label={label} />
            )}
        </g>
    )
}

const HorizontalBarChart = ({
    buckets,
    total,
    i18nNamespace,
    translateData,
    mode,
    units,
    chartProps
}) => {
    const theme = useContext(ThemeContext)
    const { translate } = useI18n()

    const { formatTick, formatValue, maxValue /*, ticks, tickCount*/ } = useBarChart({
        buckets,
        total,
        i18nNamespace,
        shouldTranslate: translateData,
        mode,
        units
    })
    const data = useMemo(
        () =>
            sortBy(
                buckets.map(bucket => ({ ...bucket })),
                'count'
            ),
        [buckets]
    )

    return (
        <div style={{ height: buckets.length * 36 + 80 }}>
            <ResponsiveBar
                layout="horizontal"
                margin={margin}
                keys={[units]}
                data={data}
                maxValue={maxValue}
                theme={theme.charts}
                enableGridX={true}
                enableGridY={false}
                enableLabel={true}
                label={d => (units === 'percentage' ? `${round(d.value, 1)}%` : d.value)}
                labelTextColor={{ theme: 'labels.text.fill' }}
                labelSkipWidth={40}
                colors={[theme.colors.barChartDefaultColor]}
                padding={0.4}
                borderRadius={1}
                axisTop={{
                    tickValues: 5,
                    format: formatValue
                }}
                axisBottom={{
                    tickValues: 5,
                    format: formatValue,
                    legend: translate(`users_${units}`),
                    legendPosition: 'middle',
                    legendOffset: 40
                }}
                axisLeft={{
                    format: formatTick,
                    tickSize: 0,
                    tickPadding: 10,
                    renderTick: tick => (
                        <TickItem
                            i18nNamespace={i18nNamespace}
                            shouldTranslate={translateData}
                            entity={buckets.find(b => b.id === tick.value).entity}
                            {...tick}
                        />
                    )
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
                {...chartProps}
            />
        </div>
    )
}

HorizontalBarChart.propTypes = {
    total: PropTypes.number.isRequired,
    buckets: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            count: PropTypes.number.isRequired,
            percentage: PropTypes.number
        })
    ),
    i18nNamespace: PropTypes.string.isRequired,
    translateData: PropTypes.bool.isRequired,
    mode: PropTypes.oneOf(['absolute', 'relative']).isRequired,
    units: PropTypes.oneOf(['count', 'percentage']).isRequired
}
HorizontalBarChart.defaultProps = {
    translateData: false
}

export default memo(HorizontalBarChart)
