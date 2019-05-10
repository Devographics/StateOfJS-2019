import React from 'react'
import PropTypes from 'prop-types'
import Block from 'core/components/Block'
import TextBlock from 'core/blocks/TextBlock'
import ChartContainer from 'core/charts/ChartContainer'
import { useI18n } from 'core/i18n/i18nContext'
import { getToolDescription } from '../tools_helpers'
import ToolOpinionsChart from '../charts/ToolOpinionsChart'
import ToolOpinionsLegend from '../charts/ToolOpinionsLegend'

const ToolOpinionBlock = ({ block, data }) => {
    const blockData = data.data.aggregations.find(a => a.id === block.id)
    const resources = data.data.fields
        ? data.data.fields.resources.find(r => r.id === block.id)
        : { resources: {} }

    if (!blockData || !blockData.opinion) {
        return <div key={block.id}>No data available for tool: {block.id}</div>
    }

    const { translate } = useI18n()

    return (
        <Block id={block.id} showDescription={false}>
            <div className="Tool FTBlock">
                <div className="Tool__Chart FTBlock__Chart">
                    <ToolOpinionsLegend />
                    <ChartContainer height={40}>
                        <ToolOpinionsChart buckets={blockData.opinion.buckets} />
                    </ChartContainer>
                </div>
                <div className="Tool__Description FTBlock__Description">
                    <TextBlock text={getToolDescription(block, resources, translate)} />
                </div>
                <div className="Feature__Resources FTBlock__Resources">*resources*</div>
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
