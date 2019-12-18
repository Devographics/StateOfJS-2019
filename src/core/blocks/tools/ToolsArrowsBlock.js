import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import Block from 'core/blocks/block/Block'
import ToolsArrowsChart from 'core/charts/tools/ToolsArrowsChart/ToolsArrowsChart'
import { toolsCategories } from '../../../../config/variables.yml'
import { useI18n } from 'core/i18n/i18nContext'
import BioBlock from 'core/blocks/other/BioBlock'

const ToolsArrowsBlock = ({ block, data }) => {
    const [activeCategory, setActiveCategory] = useState('all')
    const { translate } = useI18n()

    return (
        <Block
            // titleProps={{ switcher: <Switcher {...{ activeCategory, setActiveCategory }} /> }}
            block={block}
            data={data}
        >
            <Fragment>
                <ToolsArrowsChart {...{ data, activeCategory }} />
                <BioBlock heading={`<span>${translate('bio.guest_visualizer')}: </span><strong>Amelia Wattenberger</strong>`} photo="/images/guests/amelia.png" bio={translate('amelia.bio')}/>
            </Fragment>
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
                            activeCategory === category ? 'active' : 'disabled'
                        }`}
                        onClick={() => setActiveCategory(category)}
                    >
                        {translate(category == 'all' ? 'all' : `page.${category}`)}
                    </span>
                ))}
            </span>
        </div>
    )
}
