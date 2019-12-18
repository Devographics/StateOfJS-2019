import React, { Fragment } from 'react'
import { format } from 'd3-format'
import periodicTableData from '../../../../config/periodic_table.yml'
import ToolPeriodicElement from 'core/blocks/tools/ToolPeriodicElement'
import { useI18n } from 'core/i18n/i18nContext'
import get from 'lodash/get'

const starsFormatter = format('.2s')

const ToolHeaderBlock = ({ block, data }) => {
    const { translate } = useI18n()

    const toolId = get(block, 'variables.toolId')
    const toolName = get(data, 'entity.name')
    const homepageLink = get(data, 'entity.homepage')
    const description = get(data, 'entity.description')
    const githubLink = get(data, 'entity.github.url')
    const stars = get(data, 'entity.github.stars')
    // const npmLink = get(data, 'entity.npm')

    return (
        <div className="Block ToolHeader">
            <div className="ToolHeader__Element">
                <ToolPeriodicElement
                    tool={toolId}
                    name={toolName}
                    symbol={periodicTableData.tools[toolId] || '??'}
                    // number={`#${number}` || '?'}
                />
            </div>
            <div className="ToolHeader__Content">
                <div className="ToolHeader__Header">
                    <h2 className="ToolHeader__Title">{toolName}</h2>
                    {stars && (
                        <div className="ToolHeader__Stars">
                            {starsFormatter(stars)} {translate('block.tool.github_stars')}
                        </div>
                    )}
                </div>
                <Fragment>
                    <div>{description}</div>
                    <div className="ToolHeader__Links">
                        {homepageLink && (
                            <a
                                className="ToolHeader__Link button button--small"
                                href={homepageLink}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {translate('block.tool.homepage_link')}
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
