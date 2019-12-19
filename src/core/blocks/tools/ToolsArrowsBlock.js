import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import Block from 'core/blocks/block/Block'
import ToolsArrowsChart from 'core/charts/tools/ToolsArrowsChart/ToolsArrowsChart'
import { toolsCategories } from '../../../../config/variables.yml'
import { useI18n } from 'core/i18n/i18nContext'
import BioBlock from 'core/blocks/other/BioBlock'
import ChartContainer from 'core/charts/ChartContainer'

const ToolsArrowsBlock = ({ block, data }) => {
    const [activeCategory, setActiveCategory] = useState('all')
    const { translate } = useI18n()

    const description = translate('block.description.toolsArrow')

    return (
        <Block
            // titleProps={{ switcher: <Switcher {...{ activeCategory, setActiveCategory }} /> }}
            block={{...block, showDescription: false}}
            data={data}
        >
            <div className="ToolsArrows__Contents">
                <div className="ToolsArrows__Description"><p>{description}</p></div>
                <ChartContainer vscroll={true}>
                    <ToolsArrowsChart {...{ data, activeCategory }} />
                </ChartContainer>
                <BioBlock
                    heading={`<span>${translate(
                        'bio.guest_visualizer'
                    )}: </span><strong>Amelia Wattenberger</strong>`}
                    photo="/images/guests/amelia.png"
                    bio={translate('amelia.bio')}
                />
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
