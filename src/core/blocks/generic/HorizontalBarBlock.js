import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import Block from 'core/blocks/block/Block'
import ChartContainer from 'core/charts/ChartContainer'
import HorizontalBarChart from 'core/charts/generic/HorizontalBarChart'

const HorizontalBarBlock = ({ block, data }) => {
    const { id, mode = 'relative', units: defaultUnits = 'percentage', translateData } = block

    const [units, setUnits] = useState(defaultUnits)

    const { total, buckets } = data

    return (
        <Block units={units} setUnits={setUnits} data={data} block={block}>
            <ChartContainer fit={true}>
                <HorizontalBarChart
                    total={total}
                    buckets={buckets}
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
        dataPath: PropTypes.string.isRequired,
        showDescription: PropTypes.bool,
        translateData: PropTypes.bool,
        mode: PropTypes.oneOf(['absolute', 'relative']),
        units: PropTypes.oneOf(['percentage', 'count'])
    }).isRequired,
    data: PropTypes.shape({
        buckets: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired
            })
        ).isRequired
    }).isRequired
}

export default memo(HorizontalBarBlock)
