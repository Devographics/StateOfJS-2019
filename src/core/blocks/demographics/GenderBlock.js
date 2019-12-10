import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import { gender } from 'core/constants.js'
import Block from 'core/components/Block'
import GaugeBarChart from 'core/charts/generic/GaugeBarChart'
import ChartContainer from 'core/charts/ChartContainer'
import GenderLegends from 'core/blocks/demographics/GendersLegends'

const GenderBlock = ({ block, data }) => {
    const { units: defaultUnits = 'percentage' } = block
    const [units, setUnits] = useState(defaultUnits)

    return (
        <Block
            units={units}
            setUnits={setUnits}
            data={data.buckets}
            block={block}
        >
            <ChartContainer height={200} fit={true}>
                <GaugeBarChart
                    units={units}
                    buckets={data.buckets}
                    mapping={gender}
                    i18nNamespace={block.id}
                />
            </ChartContainer>
            <GenderLegends data={data.buckets} units={units} />
        </Block>
    )
}

GenderBlock.propTypes = {
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

export default memo(GenderBlock)
