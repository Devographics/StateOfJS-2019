import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Block from 'core/blocks/block/Block'
import ChartContainer from 'core/charts/ChartContainer'
import StreamChart from 'core/charts/generic/StreamChart'
import BlockLegend from 'core/blocks/block/BlockLegends'
// import { opinions } from 'core/constants.js'
import { useI18n } from 'core/i18n/i18nContext'
import { keys, toolExperience } from 'core/constants.js'

const ToolExperienceBlock = ({ block, data, units: defaultUnits = 'percentage' }) => {
    const { id, bucketKeysName = id } = block
    const [units, setUnits] = useState(defaultUnits)
    const [current, setCurrent] = useState(null)
    const { translate } = useI18n()

    // const { translate } = useI18n()
    const bucketKeys = keys[bucketKeysName]

    const legends = toolExperience.map(item => ({
        ...item,
        label: translate(`opinions.legends.${item.id}`)
    }))

    return (
        <Block
            // title={translate(`tool.${block.id}`, {}, get(data, 'entity.name'))}
            units={units}
            setUnits={setUnits}
            block={block}
            data={data}
        >
            <ChartContainer height={260} fit={true}>
                <StreamChart
                    colorScale={toolExperience.map(i => i.color)}
                    current={current}
                    data={data}
                    keys={bucketKeys}
                    units={units}
                    applyEmptyPatternTo="never_heard"
                    // i18nNamespace="opinions.legends"
                />
            </ChartContainer>
            {/* <BlockLegend
                legends={legends}
                onMouseEnter={({ id }) => {
                    setCurrent(id)
                }}
                onMouseLeave={() => {
                    setCurrent(null)
                }}
            /> */}
        </Block>
    )
}

ToolExperienceBlock.propTypes = {
    block: PropTypes.shape({
        id: PropTypes.string.isRequired,
        dataPath: PropTypes.string.isRequired
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

export default ToolExperienceBlock
