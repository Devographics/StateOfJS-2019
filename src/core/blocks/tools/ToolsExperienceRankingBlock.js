import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import Block from 'core/blocks/block/Block'
import ChartContainer from 'core/charts/ChartContainer'
import ToolsExperienceRankingChart from 'core/charts/tools/ToolsExperienceRankingChart'
import { useI18n } from 'core/i18n/i18nContext'

const ToolsExperienceRankingBlock = ({ block, data }) => {
    const { translate } = useI18n()
    const [metric, setMetric] = useState('satisfaction')
    const title = translate(`block.title.toolExperienceRanking`)
    const description = translate(`block.description.toolExperienceRanking`)
    const chartData = useMemo(
        () =>
            data.map(tool => {
                return {
                    id: tool.id,
                    data: tool[metric].map(bucket => {
                        return {
                            x: bucket.year,
                            y: bucket.rank,
                            percentage: bucket.percentage
                        }
                    })
                }
            }),
        [data, metric]
    )

    return (
        <Block block={{ ...block, title, description }} data={data}>
            <div>
                <span
                    onClick={() => setMetric('awareness')}
                    style={{
                        cursor: 'pointer',
                        fontWeight: metric === 'awareness' ? 'bold' : 'normal',
                        opacity: metric === 'awareness' ? 1 : 0.7,
                        textDecoration: metric === 'awareness' ? 'underline' : 'none'
                    }}
                >
                    awareness
                </span>
                &nbsp;&nbsp;
                <span
                    onClick={() => setMetric('interest')}
                    style={{
                        cursor: 'pointer',
                        fontWeight: metric === 'interest' ? 'bold' : 'normal',
                        opacity: metric === 'interest' ? 1 : 0.7,
                        textDecoration: metric === 'interest' ? 'underline' : 'none'
                    }}
                >
                    interest
                </span>
                &nbsp;&nbsp;
                <span
                    onClick={() => setMetric('satisfaction')}
                    style={{
                        cursor: 'pointer',
                        fontWeight: metric === 'satisfaction' ? 'bold' : 'normal',
                        opacity: metric === 'satisfaction' ? 1 : 0.7,
                        textDecoration: metric === 'satisfaction' ? 'underline' : 'none'
                    }}
                >
                    satisfaction
                </span>
            </div>
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
