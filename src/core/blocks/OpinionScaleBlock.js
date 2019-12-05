import React, { memo, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import Block from 'core/components/Block'
import ChartContainer from 'core/charts/ChartContainer'
import VerticalBarChart from 'core/charts/VerticalBarChart'
import { useI18n } from 'core/i18n/i18nContext'
import { getColor } from '../../constants'
import { usePageContext } from '../helpers/pageContext'
import StronglyDisagreeIcon from '../../modules/opinions/components/icons/StronglyDisagreeIcon'
import DisagreeIcon from '../../modules/opinions/components/icons/DisagreeIcon'
import NeutralIcon from '../../modules/opinions/components/icons/NeutralIcon'
import AgreeIcon from '../../modules/opinions/components/icons/AgreeIcon'
import StronglyAgreeIcon from '../../modules/opinions/components/icons/StronglyAgreeIcon'

const emojiIcons = [StronglyDisagreeIcon, DisagreeIcon, NeutralIcon, AgreeIcon, StronglyAgreeIcon]

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
                        <Emoji size={size} />
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

    const buckets = useMemo(() => getChartData(blockData[dataKey].buckets), [blockData, dataKey])

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
