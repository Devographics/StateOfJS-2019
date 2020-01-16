import defaultsDeep from 'lodash/defaultsDeep'
import charts from '../../charts'
import colors from './colors'

export default defaultsDeep(
    {
        axis: {
            ticks: {
                line: {
                    fill: colors.text
                },
                text: {
                    fill: colors.text
                }
            },
            legend: {
                text: {
                    fill: colors.text
                }
            }
        },
        streamTimelineAxis: {
            ticks: {
                line: {
                    stroke: colors.text
                },
                text: {
                    fill: colors.text
                }
            }
        },
        grid: {
            line: {
                stroke: '#6e778d'
            }
        },
        legends: {
            text: {
                fill: colors.text
            }
        },
        labels: {
            text: {
                fill: '#ffffff'
            }
        }
    },
    charts
)
