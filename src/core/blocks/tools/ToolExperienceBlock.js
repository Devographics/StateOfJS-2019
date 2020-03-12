import React, { useState, useContext, useMemo } from 'react'
import PropTypes from 'prop-types'
import { ThemeContext } from 'styled-components'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import Block from 'core/blocks/block/Block'
import ChartContainer from 'core/charts/ChartContainer'
import StreamChart from 'core/charts/generic/StreamChart'
import { useI18n } from 'core/i18n/i18nContext'
import { toolExperience } from 'core/constants'

const ToolExperienceBlock = ({ block, data, units: defaultUnits = 'percentage' }) => {
    const { blockName } = block
    const [units, setUnits] = useState(defaultUnits)
    const [current, setCurrent] = useState(null)
    const { translate } = useI18n()
    const name = get(data, 'entity.name')
    const title = translate(`block.title.${blockName}`, { values: { name } })
    const description = translate(`block.description.${blockName}`, { values: { name } })
    const chartData = get(data, 'experience.allYears')

    const theme = useContext(ThemeContext)
    const colors = useMemo(
        () => toolExperience.map(item => theme.colors.ranges.toolExperience[item.id]),
        [theme]
    )

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
                    colorScale={colors}
                    current={current}
                    data={chartData.length === 1 ? [chartData[0], chartData[0]] : chartData}
                    keys={toolExperience.map(k => k.id)}
                    units={units}
                    applyEmptyPatternTo="never_heard"
                    namespace="toolExperience"
                />
            </ChartContainer>
        </Block>
    )
}

ToolExperienceBlock.propTypes = {
    block: PropTypes.shape({
        id: PropTypes.string.isRequired
    }).isRequired
}

export default ToolExperienceBlock
