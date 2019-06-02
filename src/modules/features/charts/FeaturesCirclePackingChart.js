import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { ResponsiveBubble } from '@nivo/circle-packing'
import theme from 'nivoTheme'
import { colors } from '../../../constants'
import ChartLabel from 'core/components/ChartLabel'
import { useTheme } from '@nivo/core'
// import { Chip } from '@nivo/tooltip'
import { useI18n } from 'core/i18n/i18nContext'
import round from 'lodash/round'

const fontSizeByRadius = radius => {
    if (radius < 25) return 8
    if (radius < 35) return 10
    if (radius < 45) return 12
    return 14
}

const Chip = ({ color, color2 }) => (
    <span className={`Chip Tooltip__Chip ${color2 && 'Chip--split'}`}>
        <span style={{ background: color }}  className="Chip__Inner"/>
        {color2 && <span style={{ background: color2 }} className="Chip__Inner" />}
    </span>
)

const Tooltip = props => {
    const { translate } = useI18n()
    const { data } = props
    const { name, awareness, awarenessColor, usage, usageColor } = data
    const theme = useTheme()

    return (
        <div style={theme.tooltip.basic}>
            <div>
                <h4 className="Tooltip__Heading">{name}</h4>
                <div className="Tooltip__Item">
                    <Chip color={awarenessColor} />
                    {translate('features.usage.know_it')}:{' '}
                    <strong className="Tooltip__Value">{awareness}</strong>
                </div>
                <div className="Tooltip__Item">
                    <Chip color={usageColor} />
                    {translate('features.usage.used_it')}:{' '}
                    <strong className="Tooltip__Value">{usage}</strong>
                </div>
                <div className="Tooltip__Item">
                    <Chip color={awarenessColor} color2={usageColor} />
                    {translate('features.usage.ratio')}:{' '}
                    <strong className="Tooltip__Value">
                        {round((usage / awareness) * 100, 1)}%
                    </strong>
                </div>
            </div>
        </div>
    )
}

const Node = ({ node, handlers }) => {

    if (node.depth === 0) {
        return (
            <circle
                cx={node.x}
                cy={node.y}
                r={node.r}
                fill="none"
                stroke={colors.teal}
                strokeWidth={1}
                strokeLinecap="round"
                strokeDasharray="2 3"
            />
        )
    }
    if (node.depth === 1 && node.data.isSection) {
        return (
            <circle
                cx={node.x}
                cy={node.y}
                r={node.r}
                fill={colors.backgroundLight}
                stroke={colors.teal}
                strokeWidth={1}
                strokeLinecap="round"
                strokeDasharray="2 3"
            />
        )
    }
    const usageRadius = node.r * (node.data.usage / node.data.awareness)

    return (
        <g
            transform={`translate(${node.x},${node.y})`}
            onMouseEnter={handlers.onMouseEnter}
            onMouseMove={handlers.onMouseMove}
            onMouseLeave={handlers.onMouseLeave}
        >
            <circle r={node.r} fill={colors.teal} />
            <circle r={usageRadius} fill={colors.blue} />
            <ChartLabel label={node.label} fontSize={fontSizeByRadius(node.r)} />
        </g>
    )
}

const FeaturesCirclePackingChart = ({ data, className }) => {
    return (
        <div className={`CirclePackingChart ${className}`}>
            <ResponsiveBubble
                theme={theme}
                margin={{
                    top: 2,
                    right: 2,
                    bottom: 2,
                    left: 2
                }}
                identity="name"
                leavesOnly={false}
                padding={5}
                colors={['white', 'blue']}
                root={data}
                value="awareness"
                nodeComponent={Node}
                animate={false}
                tooltip={Tooltip}
            />
        </div>
    )
}

FeaturesCirclePackingChart.propTypes = {
    data: PropTypes.shape({
        features: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                usage: PropTypes.shape({
                    total: PropTypes.number.isRequired,
                    buckets: PropTypes.arrayOf(
                        PropTypes.shape({
                            id: PropTypes.string.isRequired,
                            count: PropTypes.number.isRequired,
                            percentage: PropTypes.number.isRequired
                        })
                    ).isRequired
                }).isRequired
            })
        )
    })
}

export default memo(FeaturesCirclePackingChart)
