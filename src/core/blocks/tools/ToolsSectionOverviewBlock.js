import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Block from 'core/blocks/block/Block'
import ChartContainer from 'core/charts/ChartContainer'
import ToolsSectionOverviewChart from 'core/charts/tools/ToolsSectionOverviewChart'

const ToolsSectionOverviewBlock = ({ block, data, units: defaultUnits = 'percentage' }) => {
    const [units, setUnits] = useState(defaultUnits)
    const [current, setCurrent] = useState(null)
    const { id, bucketKeysName = id } = block

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
            <ChartContainer height={400}>
                <ToolsSectionOverviewChart
                    data={data}
                    units={units}
                    current={current}
                    namespace={bucketKeysName}
                />
            </ChartContainer>
        </Block>
    )
}

ToolsSectionOverviewBlock.propTypes = {
    block: PropTypes.shape({
        id: PropTypes.string.isRequired
    }).isRequired,
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            entity: PropTypes.shape({
                name: PropTypes.string.isRequired
            }).isRequired,
            experience: PropTypes.shape({
                year: PropTypes.shape({
                    buckets: PropTypes.arrayOf(
                        PropTypes.shape({
                            id: PropTypes.string.isRequired,
                            count: PropTypes.number.isRequired,
                            percentage: PropTypes.number.isRequired
                        })
                    ).isRequired
                }).isRequired
            })
        })
    ).isRequired
}

export default ToolsSectionOverviewBlock
