import React, { memo, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import round from 'lodash/round'
import PropTypes from 'prop-types'
import { ResponsiveBubble } from '@nivo/circle-packing'
import { useTheme } from '@nivo/core'
import { colors, getColor } from 'core/constants'
import ChartLabel from 'core/components/ChartLabel'
import { useI18n } from 'core/i18n/i18nContext'

const fontSizeByRadius = radius => {
    if (radius < 25) return 8
    if (radius < 35) return 10
    if (radius < 45) return 12
    return 14
}

const Chip = ({ color, color2 }) => (
    <span className={`Chip Tooltip__Chip ${color2 && 'Chip--split'}`}>
        <span style={{ background: color }} className="Chip__Inner" />
        {color2 && <span style={{ background: color2 }} className="Chip__Inner" />}
    </span>
)

const sectionLabelOffsets = {
    'shapes-and-graphics': 50,
    layout: 300,
    interactions: 150,
    'animations-and-transforms': 0,
    typography: 50,
    'other-features': 300
}

const Tooltip = props => {
    const { translate } = useI18n()
    const { data } = props
    const { name, awareness, usage } = data
    const theme = useTheme()

    return (
        <div style={theme.tooltip.basic}>
            <div>
                <h4 className="Tooltip__Heading">{name}</h4>
                <div className="Tooltip__Item">
                    <Chip color={`${getColor(data.sectionId)}50`} />
                    {translate('featureExperienceSimplified.know_it.long')}:{' '}
                    <strong className="Tooltip__Value">{awareness}</strong>
                </div>
                <div className="Tooltip__Item">
                    <Chip color={getColor(data.sectionId)} />
                    {translate('featureExperienceSimplified.used_it.long')}:{' '}
                    <strong className="Tooltip__Value">{usage}</strong>
                </div>
                <div className="Tooltip__Item">
                    <Chip
                        color={`${getColor(data.sectionId)}50`}
                        color2={getColor(data.sectionId)}
                    />
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
    const radius = node.r

    if (node.depth === 0) {
        return null
    }

    if (node.depth === 1 && node.data.isSection) {
        return (
            <g transform={`translate(${node.x},${node.y})`}>
                <defs>
                    <path
                        d={`M-${radius},0a${radius},${radius} 0 1,0 ${radius *
                            2},0a${radius},${radius} 0 1,0 -${radius * 2},0`}
                        id={`textcircle-${node.data.id}`}
                    />
                </defs>
                <CirclePackingNodeCategoryLabel dy={30}>
                    <textPath
                        xlinkHref={`#textcircle-${node.data.id}`}
                        side="right"
                        startOffset={sectionLabelOffsets[node.data.id]}
                    >
                        {node.id}
                    </textPath>
                </CirclePackingNodeCategoryLabel>
                <circle
                    r={node.r}
                    fill="rgba(255,255,255,0.1)"
                    stroke={colors.teal}
                    strokeWidth={1}
                    strokeLinecap="round"
                    strokeDasharray="2 3"
                />
            </g>
        )
    }
    const usageRadius = node.r * (node.data.usage / node.data.awareness)

    return (
        <CirclePackingNode
            className="CirclePackingNode"
            transform={`translate(${node.x},${node.y})`}
            onMouseEnter={handlers.onMouseEnter}
            onMouseMove={handlers.onMouseMove}
            onMouseLeave={handlers.onMouseLeave}
        >
            <circle r={node.r} fill={`${getColor(node.data.sectionId)}50`} />
            <circle r={usageRadius} fill={`${getColor(node.data.sectionId)}`} />
            <ChartLabel label={node.label} fontSize={fontSizeByRadius(node.r)} />
        </CirclePackingNode>
    )
}

const FeaturesCirclePackingChart = ({ data, className }) => {
    const theme = useContext(ThemeContext)

    return (
        <Chart className={`CirclePackingChart ${className}`}>
            <ResponsiveBubble
                theme={theme.charts}
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
        </Chart>
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

const Chart = styled.div`
    svg {
        overflow: visible;
    }
`

const CirclePackingNode = styled.g`
    &.CirclePackingNode--inactive {
        opacity: 0.15;
    }
`

const CirclePackingNodeCategoryLabel = styled.text`
    fill: ${({ theme }) => theme.colors.link};
    opacity: 0.65;
`

export default memo(FeaturesCirclePackingChart)
