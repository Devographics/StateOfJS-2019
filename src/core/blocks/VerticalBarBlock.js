import React, { memo, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { keys } from '../../constants'
import Block from 'core/components/Block'
import Legends from 'core/charts/Legends'
import ChartContainer from 'core/charts/ChartContainer'
import VerticalBarChart from 'core/charts/VerticalBarChart'
import { useI18n } from 'core/i18n/i18nContext'
import ChartModeSelector from 'core/charts/ChartModeSelector'
import ChartUnitsSelector from 'core/charts/ChartUnitsSelector'

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

    return { sortedBuckets, bucketKeys, total: blockData[block.dataKey].total }
}

const VerticalBarBlock = ({ block, data }) => {
    const {
        id,
        showDescription,
        showLegend,
        mode: defaultMode = 'relative',
        units: defaultUnits = 'percentage',
        translateData
    } = block

    const { translate } = useI18n()

    const [mode, setMode] = useState(defaultMode)
    const [units, setUnits] = useState(defaultUnits)

    const { bucketKeys, sortedBuckets, total } = useMemo(() => getChartData(data, block), [
        data,
        block
    ])

    const legends = bucketKeys.map(key => ({
        id: `${block.id}.${key}`,
        label: translate(`${block.id}.${key}.long`),
        keyLabel: `${translate(`${block.id}.${key}.short`)}:`
    }))

    return (
        <Block id={id} showDescription={showDescription}>
            <div className="ChartControls">
                <ChartModeSelector mode={mode} onChange={setMode} />
                <ChartUnitsSelector units={units} onChange={setUnits} />
            </div>
            {showLegend && <Legends legends={legends} layout="vertical" />}
            <ChartContainer>
                <VerticalBarChart
                    keys={bucketKeys}
                    total={total}
                    buckets={sortedBuckets}
                    i18nNamespace={block.id}
                    translateData={translateData}
                    mode={mode}
                    units={units}
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
