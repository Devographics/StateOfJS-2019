import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { format } from 'd3-format'
// import bestOfJsData from 'data/bestofjs'
import periodicTableData from '../../../../config/periodic_table.yml'
// import ranking from 'data/results/tools_ranking.yml'
import PeriodicElement from 'core/blocks/tools/ToolPeriodicElement'
// import Trans from 'core/i18n/Trans'
// import { translateOrFallback } from 'core/i18n/translator'
// import { libraryDescriptionToTranslationKey } from 'core/i18n/translation-key-getters'
// import { getToolName } from 'core/helpers/tools'
import { useI18n } from 'core/i18n/i18nContext'
import get from 'lodash/get'

const starsFormatter = format('.2s')

const ToolHeaderBlock = ({ block, data }) => {
  console.log(block)
  console.log(data)
  const { translate } = useI18n()

    const toolId = get(block, 'variables.toolId')
    const toolName = get(data, 'entity.name')
    const homepageLink = get(data, 'entity.homepage')
    const description = get(data, 'entity.description')
    const githubLink = get(data, 'entity.github.url')
    const stars = get(data, 'entity.github.stars')
    const npmLink = get(data, 'entity.npm')

    // const number = ranking[tool]
    const number = 9
    return (
        <div className="Block ToolHeader">
            <div className="ToolHeader__Element">
                <PeriodicElement
                    tool={toolId}
                    name={toolName}
                    symbol={periodicTableData.tools[toolId] || '??'}
                    number={`#${number}` || '?'}
                />
            </div>
            <div className="ToolHeader__Content">
                <div className="ToolHeader__Header">
                    <h2 className="ToolHeader__Title">{toolName}</h2>
                    {stars && (
                        <div className="ToolHeader__Stars">
                            {starsFormatter(stars)} {translate('github_stars')}
                        </div>
                    )}
                </div>
                <Fragment>
                    <div>{translate(toolName)}</div>
                    <div className="ToolHeader__Links">
                        {homepageLink && (
                            <a
                                className="ToolHeader__Link button button--small"
                                href={homepageLink}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {translate('tool_homepage')}
                            </a>
                        )}
                        {githubLink && (
                            <a
                                className="ToolHeader__Link button button--small"
                                href={githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                GitHub
                            </a>
                        )}
                    </div>
                </Fragment>
            </div>
        </div>
    )
}

export default ToolHeaderBlock
