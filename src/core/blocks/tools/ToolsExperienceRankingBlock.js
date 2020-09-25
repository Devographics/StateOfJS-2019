import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import Block from 'core/blocks/block/Block'
import ChartContainer from 'core/charts/ChartContainer'
import ToolsExperienceRankingChart from 'core/charts/tools/ToolsExperienceRankingChart'
import { useI18n } from 'core/i18n/i18nContext'
import ButtonGroup from 'core/components/ButtonGroup'
import Button from 'core/components/Button'

const Switcher = ({ setMetric, metric }) => {
    const { translate } = useI18n()

    return (
        <ButtonGroup>
            {['satisfaction', 'interest', 'awareness'].map(key => (
                <Button
                    key={key}
                    size="small"
                    className={`Button--${
                        metric === key ? 'selected' : 'unselected'
                    }`}
                    onClick={() => setMetric(key)}
                >
                    <span className="desktop">{translate(`opinions.legends.${key}_ratio`)}</span>
                    <span className="mobile">{translate(`opinions.legends.${key}_ratio`)[0]}</span>
                </Button>
            ))}
        </ButtonGroup>
    )
}
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
                    name: tool.entity.name,
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
        <Block
            block={{
                ...block,
                title,
                description
            }}
            titleProps={{ switcher: <Switcher setMetric={setMetric} metric={metric} /> }}
            data={data}
        >
            <ChartContainer height={data.length * 50 + 80}>
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
                    rank: PropTypes.number,
                    percentage: PropTypes.number
                })
            ).isRequired,
            interest: PropTypes.arrayOf(
                PropTypes.shape({
                    year: PropTypes.number.isRequired,
                    rank: PropTypes.number,
                    percentage: PropTypes.number
                })
            ).isRequired,
            satisfaction: PropTypes.arrayOf(
                PropTypes.shape({
                    year: PropTypes.number.isRequired,
                    rank: PropTypes.number,
                    percentage: PropTypes.number
                })
            ).isRequired
        })
    ).isRequired
}

export default ToolsExperienceRankingBlock
