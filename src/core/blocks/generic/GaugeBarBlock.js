import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import { gender } from 'core/constants.js'
import Block from 'core/blocks/block/Block'
import GaugeBarChart from 'core/charts/generic/GaugeBarChart'
import ChartContainer from 'core/charts/ChartContainer'

const GaugeBarBlock = ({ block, data }) => {
    const { id, units: defaultUnits = 'percentage' } = block
    const [units, setUnits] = useState(defaultUnits)

    return (
        <Block units={units} setUnits={setUnits} data={data} block={block}>
            <ChartContainer height={200} fit={true}>
                <GaugeBarChart
                    units={units}
                    buckets={data.buckets}
                    colorMapping={gender}
                    i18nNamespace={id}
                />
            </ChartContainer>
        </Block>
    )
}

GaugeBarBlock.propTypes = {
    block: PropTypes.shape({
        id: PropTypes.string.isRequired
    }).isRequired,
    data: PropTypes.shape({
        buckets: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired
            })
        ).isRequired
    }).isRequired
}

export default memo(GaugeBarBlock)
