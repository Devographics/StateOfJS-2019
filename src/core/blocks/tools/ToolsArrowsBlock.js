import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Block from 'core/blocks/block/Block'
import ToolsArrowsChart from 'core/charts/tools/ToolsArrowsChart/ToolsArrowsChart'
import { toolsCategories } from '../../../../config/variables.yml'
import { useI18n } from 'core/i18n/i18nContext'

const BioBlock = () => {
    const { translate } = useI18n()
    return (
        <div>{translate('amelia.bio')}</div>
    )
}

const ToolsArrowsBlock = ({ block, data }) => {
    const [activeCategory, setActiveCategory] = useState('all')

    return (
        <Block
            titleProps={{ switcher: <Switcher {...{ activeCategory, setActiveCategory }} /> }}
            block={block}
        >
            <ToolsArrowsChart {...{ data, activeCategory }} />
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
        <div className="ChartUnitsSelector">
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
