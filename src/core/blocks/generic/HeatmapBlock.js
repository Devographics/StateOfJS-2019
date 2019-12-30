import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { salaryArray, workExperienceArray, companySizeArray } from 'core/constants.js'
import Block from 'core/blocks/block/Block'
import HeatmapChart from 'core/charts/generic/HeatmapChart'
import { useI18n } from 'core/i18n/i18nContext'
import ChartContainer from 'core/charts/ChartContainer'

const keysByType = {
    salary: salaryArray,
    workExperience: workExperienceArray,
    companySize: companySizeArray
}

const HeatmapBlock = ({ block, data }) => {
    const { id, blockName = id } = block
    const { translate } = useI18n()
    const title = translate(`block.title.${blockName}_heatmap`)
    const description = translate(`block.description.${blockName}_heatmap`)

    return (
        <Block data={data.buckets} block={{...block, title, description }}>
            <ChartContainer>
                <HeatmapChart
                    keys={keysByType[block.variables.heatmapId]}
                    data={data.buckets}
                    i18nNamespace={block.variables.heatmapId}
                />
            </ChartContainer>
        </Block>
    )
}

HeatmapBlock.propTypes = {
    block: PropTypes.shape({
        id: PropTypes.string.isRequired,
        variables: PropTypes.shape({
            subject: PropTypes.oneOf(['tools', 'features']).isRequired,
            heatmapId: PropTypes.oneOf(['workExperience', 'salary', 'companySize']).isRequired
        }).isRequired
    }).isRequired,
    data: PropTypes.shape({
        year: PropTypes.number.isRequired,
        buckets: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                total: PropTypes.number.isRequired,
                ranges: PropTypes.arrayOf(
                    PropTypes.shape({
                        range: PropTypes.string.isRequired,
                        count: PropTypes.number.isRequired,
                        percentage: PropTypes.number.isRequired
                    })
                ).isRequired
            })
        ).isRequired
    })
}

export default memo(HeatmapBlock)
