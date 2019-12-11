import React from 'react'
import PropTypes from 'prop-types'
import { ResponsiveBump } from '@nivo/bump'
import Block from 'core/blocks/block/Block'
import ChartContainer from 'core/charts/ChartContainer'
import theme from 'nivoTheme'

const ToolsExperienceRankingBlock = ({ block, data }) => {
    const chartData = data.map(tool => {
        return {
            id: tool.id,
            data: tool.satisfaction.map(bucket => {
                return {
                    x: bucket.year,
                    y: bucket.rank
                }
            })
        }
    })

    console.log({ block, data, chartData })

    return (
        <Block
            // title={translate(`tool.${block.id}`, {}, get(data, 'entity.name'))}
            block={block}
            data={data}
        >
            <ChartContainer height={data.length * 50 + 80} fit={true}>
                <ResponsiveBump
                    data={chartData}
                    margin={{ top: 40, right: 100, bottom: 40, left: 100 }}
                    colors={{ scheme: 'accent' }}
                    lineWidth={5}
                    activeLineWidth={8}
                    inactiveLineWidth={5}
                    theme={theme}
                    enableGridX={true}
                    enableGridY={false}
                    axisTop={{
                        tickSize: 0,
                        tickPadding: 9
                    }}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 0,
                        tickPadding: 9
                    }}
                    axisLeft={null}
                    startLabel={true}
                    startLabelTextColor={{
                        from: 'color',
                        modifiers: [['brighter', 1]]
                    }}
                    startLabelPadding={20}
                    endLabel={true}
                    endLabelTextColor={{
                        from: 'color',
                        modifiers: [['brighter', 1]]
                    }}
                    endLabelPadding={20}
                    pointSize={12}
                    activePointSize={20}
                    inactivePointSize={12}
                />
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
