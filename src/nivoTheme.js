import { getColor, colors, colorRange, fontFamily } from './constants'

export default {
    name: 'state_of_css_2019',
    // background: '#ffffff',
    opinionColors: {
        would_use: colors.pink,
        would_not_use: colors.pinkLight,
        interested: colors.blue,
        not_interested: colors.blueDark,
        never_heard: colors.greyLight
    },
    opinionScaleColors: colorRange,
    salaryColors: colorRange,
    sourceColors: {
        Email: colors.teal,
        Twitter: colors.aqua,
        Reddit: colors.red,
        Slack: 'rgb(110, 93, 133)',
        'JavaScript Weekly': colors.yellow,
        'Hacker News': 'rgb(240, 128, 72)',
        Medium: '#48A57F',
        Facebook: 'rgb(99, 130, 197)',
        'Other/Unknown': colors.greyMedium
    },
    axis: {
        domain: {
            line: {
                strokeWidth: 0,
                stroke: colors.greyDark
            }
        },
        ticks: {
            line: {
                fill: getColor('legend'),
            },
            text: {
                fill: getColor('legend'),
                fontSize: 12,
                fontFamily
            }
        },
        legend: {
            text: {
                fill: getColor('legend'),
                fontSize: 14,
                fontWeight: 600,
                fontFamily
            }
        }
    },
    grid: {
        line: {
            stroke: colors.greyMedium,
            strokeDasharray: '1 2',
            strokeOpacity: 0.4
        }
    },
    streamTimelineAxis: {
        ticks: {
            line: {
                strokeWidth: 2,
                stroke: colors.greyLight
            },
            text: {
                fontSize: 16,
                fill: colors.greyLight
            }
        }
    },
    legends: {
        text: {
            fontSize: 11,
            fill: colors.greyLight,
            fontFamily
        }
    },
    tooltip: {
        container: {
            fontSize: 14,
            background: colors.greyLight,
            color: colors.blueDark,
            borderRadius: 0,
            boxShadow: `9px 9px 0 rgba(0, 0, 0, 0.15)`
        }
    },
    labels: {
        text: {
            fill: colors.navyDark,
            fontSize: 12,
            fontWeight: 500,
            fontFamily,
            textShadow: `0px 2px 3px rgba(0,0,0,0.35)`
        }
    },
    dots: {
        text: {
            fill: colors.greyDark,
            fontSize: 12
        }
    }
}
