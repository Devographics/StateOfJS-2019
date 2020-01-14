import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Block from 'core/blocks/block/Block'
import ChartContainer from 'core/charts/ChartContainer'
import StreamChart from 'core/charts/generic/StreamChart'
import { useI18n } from 'core/i18n/i18nContext'
import { keys, toolExperience } from 'core/constants.js'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'

const ToolExperienceBlock = ({ block, data, units: defaultUnits = 'percentage' }) => {
    const { id, bucketKeysName = id, blockName } = block
    const [units, setUnits] = useState(defaultUnits)
    const [current, setCurrent] = useState(null)
    const { translate } = useI18n()
    const name = get(data, 'entity.name')
    const bucketKeys = keys[bucketKeysName]
    const title = translate(`block.title.${blockName}`, { values: { name } })
    const description = translate(`block.description.${blockName}`, { values: { name } })
    const chartData = get(data, 'experience.allYears')
    if (!chartData || isEmpty(chartData)) {
        return <div>no data</div>
    }
    return (
        <Block
            units={units}
            setUnits={setUnits}
            block={{ ...block, title, description }}
            data={chartData}
            legendProps={{
                onMouseEnter: ({ id }) => {
                    setCurrent(id)
                },
                onMouseLeave: () => {
                    setCurrent(null)
                }
            }}
            setCurrent={setCurrent}
        >
            <ChartContainer height={260} fit={true}>
                <StreamChart
                    colorScale={toolExperience.map(i => i.color)}
                    current={current}
                    data={chartData.length === 1 ? [chartData[0], chartData[0]] : chartData}
                    keys={bucketKeys.map(k => k.id)}
                    units={units}
                    applyEmptyPatternTo="never_heard"
                    namespace={bucketKeysName}
                />
            </ChartContainer>
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
