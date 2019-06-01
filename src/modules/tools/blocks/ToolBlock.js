import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Block from 'core/components/Block'
import TextBlock from 'core/blocks/TextBlock'
import ChartContainer from 'core/charts/ChartContainer'
import { useI18n } from 'core/i18n/i18nContext'
import GaugeBarChart from 'core/charts/GaugeBarChart'
import ToolLegend from '../charts/ToolLegend'
import { opinions } from '../../../constants'
import get from 'lodash/get'

const ToolOpinionBlock = ({ block, data, units: defaultUnits = 'percentage' }) => {
    const [units, setUnits] = useState(defaultUnits)

    const blockData = data.data.aggregations.find(a => a.id === block.id)
    const resources = data.data.fields
        ? data.data.fields.resources.find(r => r.id === block.id)
        : { resources: {} }

    if (!blockData || !blockData.opinion) {
        return <div key={block.id}>No data available for tool: {block.id}</div>
    }

    const { translate } = useI18n()

    let githubName = get(resources, 'github.name')
    githubName = githubName && githubName.charAt(0).toUpperCase() + githubName.slice(1)

    const fullName = get(resources, 'entity.name') || githubName
    const githubLink = get(resources, 'github.url')
    const homepageLink = get(resources, 'entity.homepage') || get(resources, 'github.homepage')
    const npmLink = get(resources, 'entity.npm')
    const description = translate(
        `block.${block.id}.description`,
        {},
        get(resources, 'entity.description') || get(resources, 'github.description')
    )

    return (
        <Block
            id={block.id}
            title={translate(`tool.${block.id}`, {}, fullName)}
            showDescription={false}
            units={units}
            setUnits={setUnits}
        >
            <div className="Tool FTBlock">
                <div className="Tool__Chart FTBlock__Chart">
                    <ToolLegend />
                    <ChartContainer height={40}>
                        <GaugeBarChart
                            buckets={blockData.opinion.buckets}
                            mapping={opinions}
                            units={units}
                            applyEmptyPatternTo="never_heard"
                            i18nNamespace="opinions.legends"
                        />
                    </ChartContainer>
                </div>
                <div className="Tool__Description FTBlock__Description">
                    <TextBlock text={description} />
                </div>
                {(githubLink || homepageLink || npmLink) && (
                    <div className="Tool__Resources FTBlock__Resources">
                        <h3>{translate('block.tool.links')}</h3>
                        <ul>
                            {githubLink && (
                                <li className="FTBlock__Links__Item">
                                    <a href={githubLink}>{translate('block.tool.github_link')}</a>
                                </li>
                            )}
                            {homepageLink && (
                                <li className="FTBlock__Links__Item">
                                    <a href={homepageLink}>
                                        {translate('block.tool.homepage_link')}
                                    </a>
                                </li>
                            )}
                            {npmLink && (
                                <li className="FTBlock__Links__Item">
                                    <a href={`https://www.npmjs.com/package/${npmLink}`}>{translate('block.tool.npm_link')}</a>
                                </li>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </Block>
    )
}

ToolOpinionBlock.propTypes = {
    block: PropTypes.shape({
        id: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired
    }).isRequired,
    data: PropTypes.shape({
        data: PropTypes.shape({
            aggregations: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.string.isRequired,
                    opinion: PropTypes.shape({
                        total: PropTypes.number.isRequired,
                        buckets: PropTypes.arrayOf(
                            PropTypes.shape({
                                id: PropTypes.string.isRequired,
                                count: PropTypes.number.isRequired,
                                percentage: PropTypes.number.isRequired
                            })
                        ).isRequired
                    })
                })
            )
        }).isRequired
    }).isRequired
}

export default ToolOpinionBlock
