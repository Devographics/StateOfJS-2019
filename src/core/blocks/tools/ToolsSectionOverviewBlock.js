import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Block from 'core/blocks/block/Block'
import ChartContainer from 'core/charts/ChartContainer'
import ToolsSectionOverviewChart from 'core/charts/tools/ToolsSectionOverviewChart'
import { keys, toolExperience } from 'core/constants.js'

const ToolsSectionOverviewBlock = ({ block, data, units: defaultUnits = 'percentage' }) => {
    const [units, setUnits] = useState(defaultUnits)
    const [current, setCurrent] = useState(null)
    const { id, bucketKeysName = id, blockName } = block
    const bucketKeys = keys[bucketKeysName]

    return (
        <Block
            units={units}
            setUnits={setUnits}
            block={block}
            data={data}
            legendProps={{
                onMouseEnter: ({ id }) => {
                    setCurrent(id)
                },
                onMouseLeave: () => {
                    setCurrent(null)
                }
            }}
        >
            <ChartContainer height={400} fit={true}>
                <ToolsSectionOverviewChart
                    data={data}
                    units={units}
                    current={current}
                    namespace={bucketKeysName}
                    keys={bucketKeys.map(k => k.id)}
                    colorScale={toolExperience.map(i => i.color)}
                />
            </ChartContainer>
        </Block>
    )
}

ToolsSectionOverviewBlock.propTypes = {
    block: PropTypes.shape({
        id: PropTypes.string.isRequired
    }).isRequired
    // data: PropTypes.shape({
    //     buckets: PropTypes.arrayOf(
    //         PropTypes.shape({
    //             id: PropTypes.string.isRequired,
    //             opinion: PropTypes.shape({
    //                 total: PropTypes.number.isRequired,
    //                 buckets: PropTypes.arrayOf(
    //                     PropTypes.shape({
    //                         id: PropTypes.string.isRequired,
    //                         count: PropTypes.number.isRequired,
    //                         percentage: PropTypes.number.isRequired
    //                     })
    //                 ).isRequired
    //             })
    //         })
    //     )
    // }).isRequired
}

export default ToolsSectionOverviewBlock
