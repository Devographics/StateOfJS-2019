import React, { memo, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { keys } from '../../constants'
import Block from 'core/components/Block'
import Legends from 'core/charts/Legends'
import ChartContainer from 'core/charts/ChartContainer'
import VerticalBarChart from 'core/charts/VerticalBarChart'
import { useI18n } from 'core/i18n/i18nContext'

const getChartData = (data, block) => {
    if (!data || !data.data) {
        throw new Error(
            `VerticalBarBlock: Missing data for block ${block.id}, page data is undefined`
        )
    }

    const bucketKeys = keys[block.bucketKeys]
    if (!Array.isArray(bucketKeys)) {
        throw new Error(
            `VerticalBarBlock: Missing bucket keys for block ${
                block.id
            }, bucketKeys: ${block.bucketKeys || 'undefined'}`
        )
    }

    const blockData = data.data.aggregations.find(agg => agg.id === block.id)

    if (!blockData) {
        throw new Error(`VerticalBarBlock: Missing data for block ${block.id}`)
    }
    if (
        blockData[block.dataKey] === undefined ||
        !Array.isArray(blockData[block.dataKey].buckets)
    ) {
        throw new Error(
            `VerticalBarBlock: Non existing or invalid data key ${block.data.key} for block ${
                block.id
            }`
        )
    }

    const sortedBuckets = bucketKeys.map(bucketKey => {
        const bucket = blockData[block.dataKey].buckets.find(b => b.id === bucketKey)
        if (bucket === undefined) {
            throw new Error(`no bucket found for key: '${bucketKey}' in block: ${block.id}`)
        }

        return bucket
    })

    return { sortedBuckets, bucketKeys }
}

const VerticalBarBlock = ({ block, data, usePercents }) => {
    const [mode, setMode] = useState(usePercents ? 'percentage' : 'count')

    const { translate } = useI18n()
    const { showDescription, showLegend } = block
    const { bucketKeys, sortedBuckets } = useMemo(() => getChartData(data, block), [data, block])

    const legends = bucketKeys.map(key => ({
        id: `${block.id}.${key}`,
        label: translate(`${block.id}.${key}.long`),
        keyLabel: `${translate(`${block.id}.${key}.short`)}:`
    }))

    return (
        <Block id={block.id} showDescription={showDescription}>
            <button
                onClick={() => {
                    if (mode === 'percentage') {
                        setMode('count')
                    } else {
                        setMode('percentage')
                    }
                }}
            >
                toggle
            </button>
            {showLegend && <Legends legends={legends} layout="vertical" />}
            <ChartContainer>
                <VerticalBarChart
                    keys={bucketKeys}
                    buckets={sortedBuckets}
                    i18nNamespace={block.id}
                    mode={mode}
                />
            </ChartContainer>
        </Block>
    )
}

VerticalBarBlock.propTypes = {
    block: PropTypes.shape({
        id: PropTypes.string.isRequired,
        dataKey: PropTypes.string.isRequired,
        bucketKeys: PropTypes.oneOf(Object.keys(keys)).isRequired,
        showDescription: PropTypes.bool
    }).isRequired,
    data: PropTypes.shape({
        data: PropTypes.shape({
            aggregations: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.string.isRequired
                })
            ).isRequired
        }).isRequired
    }).isRequired
}

export default memo(VerticalBarBlock)
