import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import Block from 'core/blocks/block/Block'
import ToolsArrowsChart from 'core/charts/tools/ToolsArrowsChart/ToolsArrowsChart'
import { toolsCategories } from '../../../../config/variables.yml'
import { useI18n } from 'core/i18n/i18nContext'
import BioBlock from 'core/blocks/other/BioBlock'
import ChartContainer from 'core/charts/ChartContainer'
import { keys } from 'core/constants.js'

const ToolsArrowsBlock = ({ block, data }) => {
    const [activeCategory, setActiveCategory] = useState('all')
    const { translate } = useI18n()
    const [current, setCurrent] = useState(null)

    const description = translate('block.description.toolsArrow')

    const legends = keys.toolCategories.map(({ id: keyId, color }) => ({
        id: `toolCategories.${keyId}`,
        label: translate(`page.${keyId}.short`),
        keyLabel: `${translate(`page.${keyId}.short`)}:`,
        color
    }))

    return (
        <Block
            // titleProps={{ switcher: <Switcher {...{ activeCategory, setActiveCategory }} /> }}
            block={{ ...block, showLegend: true, legends, showDescription: false }}
            data={data}
            legendProps={{
                legends,
                onMouseEnter: ({ id }) => {
                    setCurrent(id.replace('toolCategories.', ''))
                },
                onMouseLeave: () => {
                    setCurrent(null)
                }
            }}
            blockFooter={
                <BioBlock
                    heading={`<span>${translate(
                        'bio.guest_visualizer'
                    )}: </span><strong>Amelia Wattenberger</strong>`}
                    photo="/images/guests/amelia.png"
                    bio={translate('amelia.bio')}
                />
            }
        >
            <div className="ToolsArrows__Contents">
                <div className="ToolsArrows__Description">
                    <p>{description}</p>
                </div>
                <ChartContainer vscroll={true}>
                    <ToolsArrowsChart {...{ data, activeCategory }} />
                </ChartContainer>
            </div>
        </Block>
    )
}

ToolsArrowsBlock.propTypes = {
    block: PropTypes.shape({
        id: PropTypes.string.isRequired,
        dataPath: PropTypes.string.isRequired
    }).isRequired
}

export default ToolsArrowsBlock

const categoryOptions = ['all', ...Object.keys(toolsCategories)]
const Switcher = ({ setActiveCategory, activeCategory }) => {
    const { translate } = useI18n()
    return (
        <div className="BlockUnitsSelector">
            <span className="ButtonGroup">
                {categoryOptions.map(category => (
                    <span
                        key={category}
                        className={`Button Button--small Button--${
                            activeCategory === category ? 'selected' : 'unselected'
                        }`}
                        onClick={() => setActiveCategory(category)}
                    >
                        {translate(category === 'all' ? 'all' : `page.${category}`)}
                    </span>
                ))}
            </span>
        </div>
    )
}
