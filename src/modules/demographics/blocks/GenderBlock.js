import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import { gender } from '../../../constants'
import Block from 'core/components/Block'
import GaugeBarChart from 'core/charts/GaugeBarChart'
import ChartContainer from 'core/charts/ChartContainer'
import GenderLegends from 'modules/demographics/charts/GendersLegends'

const GenderBlock = ({ block, data }) => {
    const { units: defaultUnits = 'percentage' } = block
    const [units, setUnits] = useState(defaultUnits)

    return (
        <Block
            id={block.id}
            showDescription={false}
            className="Block--gender Gender__Block"
            units={units}
            setUnits={setUnits}
            completion={data.completion}
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
