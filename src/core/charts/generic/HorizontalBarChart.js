import React, { memo, useMemo } from 'react'
import PropTypes from 'prop-types'
import { ResponsiveBar } from '@nivo/bar'
import theme from 'nivoTheme'
import { useI18n } from 'core/i18n/i18nContext'
import { fontFamily, getColor } from 'core/constants.js'
import { useBarChart } from 'core/charts/hooks.js'
import BarTooltip from 'core/charts/generic/BarTooltip'
import HorizontalBarStripes from './HorizontalBarStripes'
import sortBy from 'lodash/sortBy'
import round from 'lodash/round'
import { useEntities } from 'core/entities/entitiesContext'

const labelMaxLength = 13

const margin = {
    top: 40,
    right: 20,
    bottom: 50,
    left: 140
}

const Text = ({ hasLink = false, label }) => (
    <text
        dominantBaseline="central"
        textAnchor="end"
        transform="translate(-10,0) rotate(0)"
        style={{
            fill: hasLink ? getColor('legendWithLink') : getColor('legend'),
            fontSize: 14,
            fontFamily
        }}
    >
        {label}
    </text>
)
const TickItem = tick => {
    const { translate } = useI18n()

    const { x, y, value, shouldTranslate, i18nNamespace, entity } = tick
    const { name, homepage } = entity
    const link = homepage

    let label = shouldTranslate ? translate(`${i18nNamespace}.${value}.short`) : name || value

    label = label.length > labelMaxLength ? label.substr(0, labelMaxLength) + '…' : label

    return (
        <g transform={`translate(${x},${y})`}>
            <line
                x1="0"
                x2="0"
                y1="0"
                y2="0"
                style={{
                    stroke: getColor('tick'),
                    strokeWidth: 1
                }}
            />
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
    const { translate } = useI18n()

    const { formatTick, formatValue, maxValue, ticks, tickCount } = useBarChart({
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
                theme={theme}
                enableGridX={true}
                enableGridY={false}
                enableLabel={true}
                label={d => (units === 'percentage' ? `${round(d.value, 1)}%` : d.value)}
                labelTextColor={{ theme: 'labels.text.fill' }}
                labelSkipWidth={40}
                colors={[getColor('bar')]}
                padding={0.4}
                borderRadius={1}
                axisTop={{
                    tickValues: 5,
                    format: formatValue,
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
