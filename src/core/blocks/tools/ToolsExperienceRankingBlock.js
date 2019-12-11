import React from 'react'
import PropTypes from 'prop-types'
import Block from 'core/blocks/block/Block'
import ChartContainer from 'core/charts/ChartContainer'
import ToolsExperienceRankingChart from 'core/charts/tools/ToolsExperienceRankingChart'

const ToolsExperienceRankingBlock = ({ block, data }) => {
    const chartData = data.map(tool => {
        return {
            id: tool.id,
            data: tool.satisfaction.map(bucket => {
                return {
                    x: bucket.year,
                    y: bucket.rank,
                    percentage: bucket.percentage
                }
            })
        }
    })

    return (
        <Block block={block} data={data}>
            <ChartContainer height={data.length * 50 + 80} fit={true}>
                <ToolsExperienceRankingChart data={chartData} />
            </ChartContainer>
        </Block>
    )
}

ToolsExperienceRankingBlock.propTypes = {
    block: PropTypes.shape({
        id: PropTypes.string.isRequired
    }).isRequired,
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            awareness: PropTypes.arrayOf(
                PropTypes.shape({
                    year: PropTypes.number.isRequired,
                    rank: PropTypes.number.isRequired,
                    percentage: PropTypes.number.isRequired
                })
            ).isRequired,
            interest: PropTypes.arrayOf(
                PropTypes.shape({
                    year: PropTypes.number.isRequired,
                    rank: PropTypes.number.isRequired,
                    percentage: PropTypes.number.isRequired
                })
            ).isRequired,
            satisfaction: PropTypes.arrayOf(
                PropTypes.shape({
                    year: PropTypes.number.isRequired,
                    rank: PropTypes.number.isRequired,
                    percentage: PropTypes.number.isRequired
                })
            ).isRequired
        })
    ).isRequired
}

export default ToolsExperienceRankingBlock
