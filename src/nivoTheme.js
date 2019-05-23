import { colors, colorRange, fontFamily } from './constants'

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
    genderColors: {
        female: colors.blueLight,
        male: colors.teal,
        non_binary: colors.pinkLight,
        prefer_not_to_say: colors.greyMedium
    },
    axis: {
        domain: {
            line: {
                strokeWidth: 0,
                stroke: '#bbb'
            }
        },
        ticks: {
            line: {
                stroke: colors.teal
            },
            text: {
                fill: colors.teal,
                fontSize: 12,
                fontFamily
            }
        },
        legend: {
            text: {
                fill: colors.teal,
                fontSize: 14,
                fontWeight: 600,
                fontFamily
            }
        }
    },
    grid: {
        line: {
            stroke: colors.teal,
            strokeDasharray: '1 2',
            strokeOpacity: 0.4
        }
    },
    streamTimelineAxis: {
        ticks: {
            line: {
                strokeWidth: 2,
                stroke: '#e8e8e8'
            },
            text: {
                fontSize: 16,
                fill: '#e8e8e8'
            }
        }
    },
    legends: {
        text: {
            fontSize: 12,
            fill: '#eee'
        }
    },
    tooltip: {
        container: {
            fontSize: 14,
            background: '#1b1f2f',
            color: colors.tealLight,
            borderRadius: 0,
            boxShadow: `9px 9px 0 rgba(0, 0, 0, 0.15)`
        }
    },
    labels: {
        text: {
            fill: '#ddd',
            fontSize: 12,
            fontWeight: 500,
            fontFamily
        }
    },
    dots: {
        text: {
            fill: '#bbb',
            fontSize: 12
        }
    }
}
