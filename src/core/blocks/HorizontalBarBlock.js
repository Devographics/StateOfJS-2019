import React, { memo, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import Block from 'core/components/Block'
import ChartContainer from 'core/charts/ChartContainer'
import HorizontalBarChart from 'core/charts/HorizontalBarChart'
import { useEntities } from 'core/entities/entitiesContext'
import sortBy from 'lodash/sortBy'

const getChartData = (data, block, getUrl) => {
    if (!data || !data.data) {
        throw new Error(
            `HorizontalBarBlock: Missing data for block ${block.id}, page data is undefined`
        )
    }

    const blockData = data.data.aggregations.find(agg => agg.id === block.id)

    if (!blockData) {
        throw new Error(`HorizontalBarBlock: Missing data for block ${block.id}`)
    }

    const blockAgg = blockData[block.dataKey]
    if (blockAgg === undefined || !Array.isArray(blockAgg.buckets)) {
        throw new Error(
            `HorizontalBarBlock: Non existing or invalid data key ${block.data.key} for block ${
                block.id
            }`
        )
    }

    blockAgg.buckets = sortBy(blockAgg.buckets.map(bucket => ({ ...bucket })), 'count').map(
        bucket => ({
            ...bucket,
            homepage: getUrl(bucket.id)
        })
    )

    return blockAgg
}

const HorizontalBarBlock = ({ block, data }) => {
    const {
        id,
        showDescription,
        mode = 'relative',
        units: defaultUnits = 'percentage',
        translateData
    } = block

    const { getUrl } = useEntities()

    const [units, setUnits] = useState(defaultUnits)

    const blockData = useMemo(() => getChartData(data, block, getUrl), [data, block])

    return (
        <Block
            id={id}
            showDescription={showDescription}
            units={units}
            setUnits={setUnits}
            completion={blockData.completion}
        >
            <ChartContainer fit={true}>
                <HorizontalBarChart
                    total={blockData.total}
                    buckets={blockData.buckets}
                    i18nNamespace={id}
                    translateData={translateData}
                    mode={mode}
                    units={units}
                />
            </ChartContainer>
        </Block>
    )
}

HorizontalBarBlock.propTypes = {
    block: PropTypes.shape({
        id: PropTypes.string.isRequired,
        dataKey: PropTypes.string.isRequired,
        showDescription: PropTypes.bool,
        translateData: PropTypes.bool,
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

export default memo(HorizontalBarBlock)
