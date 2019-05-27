import React, { memo, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import Block from 'core/components/Block'
import ChartContainer from 'core/charts/ChartContainer'
import ParticipationByCountryMapChart from '../charts/ParticipationByCountryMapChart'
import ChartUnitsSelector from 'core/charts/ChartUnitsSelector'

const ParticipationByCountryBlock = ({ block, data, units: defaultUnits = 'percentage' }) => {
    const [units, setUnits] = useState(defaultUnits)

    const blockData = useMemo(() => data.data.aggregations.find(agg => agg.id === block.id), [
        block.id,
        data.data.aggregations
    ])

    return (
        <Block id={block.id} showDescription={true}>
            <div className="ChartControls">
                <ChartUnitsSelector units={units} onChange={setUnits} />
            </div>
            <ChartContainer>
                <ParticipationByCountryMapChart units={units} data={blockData.breakdown.buckets} />
            </ChartContainer>
        </Block>
    )
}

ParticipationByCountryBlock.propTypes = {
    block: PropTypes.shape({
        id: PropTypes.string.isRequired
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

export default memo(ParticipationByCountryBlock)
