import colors from '../../colors'

export default {
    background: colors.navy,
    backgroundAlt: colors.navyDark,
    backgroundInverted: '#aac6c9',
    text: '#9ac6c9',
    textInverted: colors.navyDark,
    textHighlight: colors.greenDark,
    link: colors.pink,
    linkActive: colors.greenDark,
    contrast: '#0bdf67',
    border: '#9ac6c9',
    heatmap: '#EC75CB',
    lineChartDefaultColor: '#59DF7F',
    barChartDefaultColor: '#59DF7F',
    ranges: {
        toolExperience: {
            would_use: '#F649A7',
            would_not_use: '#EC75CB',
            interested: '#59DF7F',
            not_interested: '#ACFFC3',
            never_heard: '#59608a'
        },
        featureExperience: {
            used_it: '#59DF7F',
            know_not_used: '#ACFFC3',
            never_heard_not_sure: '#59608a'
        },
        featureExperienceSimplified: {
            know_it: '#ACFFC3',
            used_it: '#59DF7F'
        },
        gender: {
            male: colors.blue,
            female: colors.teal,
            non_binary: colors.red,
            prefer_not_to_say: colors.greyMediumer
        }
    },
    distinct: [
        colors.indigo,
        colors.teal,
        colors.pink,
        colors.red,
        colors.green,
        colors.yellow,
        colors.aqua,
        colors.orange,
        colors.olive,
        colors.skyblue,
        colors.purple
    ]
}
