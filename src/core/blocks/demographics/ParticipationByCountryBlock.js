import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import Block from 'core/components/Block'
import ChartContainer from 'core/charts/ChartContainer'
import ParticipationByCountryChart from 'core/charts/demographics/ParticipationByCountryChart'

const ParticipationByCountryBlock = ({ block, data, units: defaultUnits = 'percentage' }) => {
    const [units, setUnits] = useState(defaultUnits)

    return (
        <Block
            units={units}
            setUnits={setUnits}
            data={data.buckets}
            block={block}
        >
            <ChartContainer height={500}>
                <ParticipationByCountryChart units={units} data={data.buckets} />
            </ChartContainer>
        </Block>
    )
}

ParticipationByCountryBlock.propTypes = {
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

export default memo(ParticipationByCountryBlock)
