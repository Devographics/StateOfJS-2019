import React, { memo, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import Block from 'core/components/Block'
import ChartContainer from 'core/charts/ChartContainer'
import VerticalBarChart from 'core/charts/VerticalBarChart'
import { useI18n } from 'core/i18n/i18nContext'
import { colors } from '../../constants'
import { usePageContext } from '../helpers/pageContext'

const SuperSad = ({ width, height }) => (
    <svg
        width={width}
        height={height}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <circle cx="50.5" cy="50.5" r="41.5" stroke="#9AC6C9" strokeWidth="4" />
        <circle cx="35.5" cy="45.5" r="3.5" fill="#9AC6C9" />
        <circle cx="64.5" cy="45.5" r="3.5" fill="#9AC6C9" />
        <path
            d="M64 75C61.2 72 57.732 69 50 69C42.268 69 38.8 72 36 75"
            stroke="#9AC6C9"
            strokeWidth="4"
            strokeLinecap="round"
        />
        <path d="M28 32L41 36" stroke="#9AC6C9" strokeWidth="4" strokeLinecap="round" />
        <path d="M73 32L59 36" stroke="#9AC6C9" strokeWidth="4" strokeLinecap="round" />
    </svg>
)

const Sad = ({ width, height }) => (
    <svg
        width={width}
        height={height}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <circle cx="50.5" cy="50.5" r="41.5" stroke={colors.teal} strokeWidth="4" />
        <circle cx="35.5" cy="40.5" r="3.5" fill={colors.teal} />
        <circle cx="64.5" cy="40.5" r="3.5" fill={colors.teal} />
        <path
            d="M65 68C62 65 58.2843 62 50 62C41.7157 62 38 65 35 68"
            stroke={colors.teal}
            strokeWidth="4"
            strokeLinecap="round"
        />
    </svg>
)

const Neutral = ({ width, height }) => (
    <svg
        width={width}
        height={height}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <circle cx="50.5" cy="50.5" r="41.5" stroke={colors.teal} strokeWidth="4" />
        <circle cx="35.5" cy="40.5" r="3.5" fill={colors.teal} />
        <circle cx="64.5" cy="40.5" r="3.5" fill={colors.teal} />
        <path d="M65 65.25H50H35" stroke={colors.teal} strokeWidth="4" strokeLinecap="round" />
    </svg>
)

const Happy = ({ width, height }) => (
    <svg
        width={width}
        height={height}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <circle cx="50.5" cy="50.5" r="41.5" stroke={colors.teal} strokeWidth="4" />
        <circle cx="35.5" cy="40.5" r="3.5" fill={colors.teal} />
        <circle cx="64.5" cy="40.5" r="3.5" fill={colors.teal} />
        <path
            d="M35 65C38 68 41.7157 71 50 71C58.2843 71 62 68 65 65"
            stroke={colors.teal}
            strokeWidth="4"
            strokeLinecap="round"
        />
    </svg>
)

const SuperHappy = ({ width, height }) => (
    <svg
        width={width}
        height={height}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <circle cx="50.5" cy="50.5" r="41.5" stroke={colors.teal} strokeWidth="4" />
        <path
            d="M35 65C38 68 41.7157 71 50 71C58.2843 71 62 68 65 65"
            stroke={colors.teal}
            strokeWidth="4"
            strokeLinecap="round"
        />
        <path
            d="M41 43C40.25 40.1429 37.8995 38 35 38C32.1005 38 29.75 40.1429 29 43"
            stroke={colors.teal}
            strokeWidth="4"
            strokeLinecap="round"
        />
        <path
            d="M70 43C69.25 40.1429 66.8995 38 64 38C61.1005 38 58.75 40.1429 58 43"
            stroke={colors.teal}
            strokeWidth="4"
            strokeLinecap="round"
        />
    </svg>
)

const emojiIcons = [SuperSad, Sad, Neutral, Happy, SuperHappy]

/* eslint-disable jsx-a11y/accessible-emoji */
const Emojis = ({ bars, size = 24 }) => (
    <>
        {bars.map((bar, i) => {
            const Emoji = emojiIcons[i]
            if (Emoji === null) {
                return null
            } else {
                return (
                    <g transform={`translate(${bar.x + bar.width / 2 - size / 2}, ${bar.y - 35})`}>
                        <Emoji height={size} width={size} />
                    </g>
                )
            }
        })}
    </>
)

const getChartData = buckets => {
    const sortedBuckets = [0, 1, 2, 3, 4].map(step => {
        const bucket = buckets.find(b => b.id === `${step}`)
        if (bucket === undefined) {
            return {
                id: `${step}`,
                count: 0,
                percentage: 0
            }
        }

        return bucket
    })

    return sortedBuckets
}

const formatTick = translate => value => {
    return translate(`opinion_scale.${value}.long`)
}

const OpinionScaleBlock = ({ block, data }) => {
    const context = usePageContext()
    const { width } = context

    const { translate } = useI18n()

    const { units: defaultUnits = 'percentage', translateData } = block
    const [units, setUnits] = useState(defaultUnits)

    const getScaleTickLabel = formatTick(translate)

    const dataKey = block.dataKey || 'opinion'
    const blockData = useMemo(() => data.data.aggregations.find(agg => agg.id === block.id), [
        block,
        data.data
    ])

    const buckets = useMemo(() => getChartData(blockData[dataKey].buckets), [
        blockData,
        dataKey,
    ])

    if (!data || !data.data) {
        return (
            <div>OpinionScaleBlock: Missing data for block {block.id}, page data is undefined</div>
        )
    }

    if (!blockData || !blockData[dataKey]) {
        return <div>OpinionScaleBlock: Missing data for block {block.id}</div>
    }

    return (
        <Block
            id={block.id}
            showDescription={true}
            units={units}
            setUnits={setUnits}
            completion={blockData[dataKey].completion}
        >
            <ChartContainer fit={true}>
                <VerticalBarChart
                    className="OpinionScaleChart"
                    buckets={buckets}
                    i18nNamespace="opinion_scale"
                    units={units}
                    translateData={translateData}
                    chartProps={{
                        axisBottom: {
                            format: getScaleTickLabel,
                            tickRotation: width && width < 500 ? -45 : 0
                        },
                        layers: ['grid', 'axes', 'bars', Emojis]
                    }}
                    viewportWidth={width}
                />
            </ChartContainer>
        </Block>
    )
}

OpinionScaleBlock.propTypes = {
    block: PropTypes.shape({
        id: PropTypes.string.isRequired,
        dataKey: PropTypes.string,
        showDescription: PropTypes.bool
    }).isRequired,
    data: PropTypes.shape({
        data: PropTypes.shape({
            aggregations: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.string.isRequired,
                    total: PropTypes.number,
                    buckets: PropTypes.arrayOf(
                        PropTypes.shape({
                            id: PropTypes.string.isRequired,
                            count: PropTypes.number.isRequired,
                            percentage: PropTypes.number
                        })
                    ).isRequired
                })
            ).isRequired
        }).isRequired
    }).isRequired
}

export default memo(OpinionScaleBlock)
