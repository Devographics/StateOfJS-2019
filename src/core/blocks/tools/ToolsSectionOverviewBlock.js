import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Block from 'core/blocks/block/Block'
import ChartContainer from 'core/charts/ChartContainer'
import ToolsSectionOverviewChart from 'core/charts/tools/ToolsSectionOverviewChart'

const ToolsSectionOverviewBlock = ({ block, data, units: defaultUnits = 'percentage' }) => {
    const [units, setUnits] = useState(defaultUnits)

    /*
    const { id, bucketKeysName = id } = block
    const [current, setCurrent] = useState(null)
    const { translate } = useI18n()

    // const { translate } = useI18n()
    const bucketKeys = keys[bucketKeysName]

    const legends = toolExperience.map(item => ({
        ...item,
        label: translate(`opinions.legends.${item.id}`)
    }))
    */

    return (
        <Block
            // title={translate(`tool.${block.id}`, {}, get(data, 'entity.name'))}
            units={units}
            setUnits={setUnits}
            block={block}
            data={data}
        >
            <ChartContainer height={400} fit={true}>
                <ToolsSectionOverviewChart data={data} units={units} />
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
