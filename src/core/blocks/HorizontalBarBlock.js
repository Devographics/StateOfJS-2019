import React, { memo, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import Block from 'core/components/Block'
import ChartContainer from 'core/charts/ChartContainer'
import HorizontalBarChart from 'core/charts/HorizontalBarChart'
import ChartModeSelector from 'core/charts/ChartModeSelector'
import ChartUnitsSelector from 'core/charts/ChartUnitsSelector'

const getChartData = (data, block) => {
    if (!data || !data.data) {
        throw new Error(
            `HorizontalBarBlock: Missing data for block ${block.id}, page data is undefined`
        )
    }

    const blockData = data.data.aggregations.find(agg => agg.id === block.id)

    if (!blockData) {
        throw new Error(`HorizontalBarBlock: Missing data for block ${block.id}`)
    }
    if (
        blockData[block.dataKey] === undefined ||
        !Array.isArray(blockData[block.dataKey].buckets)
    ) {
        throw new Error(
            `HorizontalBarBlock: Non existing or invalid data key ${block.data.key} for block ${
                block.id
            }`
        )
    }

    return blockData[block.dataKey]
}

const HorizontalBarBlock = ({ block, data }) => {
    const {
        id,
        showDescription,
        mode: defaultMode = 'relative',
        units: defaultUnits = 'percentage',
        translateData
    } = block

    const [mode, setMode] = useState(defaultMode)
    const [units, setUnits] = useState(defaultUnits)

    const blockData = useMemo(() => getChartData(data, block), [data, block])

    return (
        <Block id={id} showDescription={showDescription}>
            <div className="ChartControls">
                <ChartModeSelector mode={mode} onChange={setMode} />
                <ChartUnitsSelector units={units} onChange={setUnits} />
            </div>
            <ChartContainer>
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
