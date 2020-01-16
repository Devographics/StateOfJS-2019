import defaultsDeep from 'lodash/defaultsDeep'
import charts from '../../charts'
import baseColors from '../../colors'
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
                    stroke: baseColors.greyLight
                },
                text: {
                    fill: baseColors.greyLight
                }
            }
        },
        grid: {
            line: {
                stroke: baseColors.greyMedium
            }
        },
        legends: {
            text: {
                fill: baseColors.greyLight
            }
        },
        tooltip: {
            container: {
                background: baseColors.greyLight,
                color: baseColors.blueDark
            }
        },
        labels: {
            text: {
                fill: baseColors.navyDark
            }
        },
        dots: {
            text: {
                fill: baseColors.greyDark
            }
        }
    },
    charts
)
