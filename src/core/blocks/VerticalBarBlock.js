import React, { memo, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { keys } from '../../constants'
import Block from 'core/components/Block'
import Legends from 'core/charts/Legends'
import ChartContainer from 'core/charts/ChartContainer'
import VerticalBarChart from 'core/charts/VerticalBarChart'
import { useI18n } from 'core/i18n/i18nContext'
import { usePageContext } from '../helpers/pageContext'

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

    const blockAgg = blockData[block.dataKey]
    if (blockAgg === undefined || !Array.isArray(blockAgg.buckets)) {
        throw new Error(
            `VerticalBarBlock: Non existing or invalid data key ${block.data.key} for block ${
                block.id
            }`
        )
    }

    const sortedBuckets = bucketKeys.map(bucketKey => {
        const bucket = blockAgg.buckets.find(b => b.id === bucketKey)
        if (bucket === undefined) {
            throw new Error(`no bucket found for key: '${bucketKey}' in block: ${block.id}`)
        }

        return bucket
    })

    return {
        sortedBuckets,
        bucketKeys,
        completion: blockAgg.completion,
        total: blockAgg.total
    }
}

const VerticalBarBlock = ({ block, data }) => {
    const {
        id,
        showDescription,
        showLegend,
        mode = 'relative',
        units: defaultUnits = 'percentage',
        translateData
    } = block

    const context = usePageContext()
    const { width } = context

    const { translate } = useI18n()

    const [units, setUnits] = useState(defaultUnits)

    const { bucketKeys, sortedBuckets, total, completion } = useMemo(
        () => getChartData(data, block),
        [data, block]
    )

    const legends = bucketKeys.map(key => ({
        id: `${block.id}.${key}`,
        label: translate(`${block.id}.${key}.long`),
        keyLabel: `${translate(`${block.id}.${key}.short`)}:`
    }))

    return (
        <Block
            id={id}
            showDescription={showDescription}
            units={units}
            setUnits={setUnits}
            completion={completion}
        >
            <ChartContainer fit={true}>
                <VerticalBarChart
                    keys={bucketKeys}
                    total={total}
                    buckets={sortedBuckets}
                    i18nNamespace={block.id}
                    translateData={translateData}
                    mode={mode}
                    units={units}
                    viewportWidth={width}
                />
            </ChartContainer>
            {showLegend && (
                <Legends
                    legends={legends}
                    layout="vertical"
                    units={units}
                    data={sortedBuckets.map(b => ({ ...b, id: `${block.id}.${b.id}` }))}
                />
            )}
        </Block>
    )
}

VerticalBarBlock.propTypes = {
    block: PropTypes.shape({
        id: PropTypes.string.isRequired,
        dataKey: PropTypes.string.isRequired,
        bucketKeys: PropTypes.oneOf(Object.keys(keys)).isRequired,
        showDescription: PropTypes.bool,
        mode: PropTypes.oneOf(['absolute', 'relative']),
        units: PropTypes.oneOf(['percentage', 'count'])
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
