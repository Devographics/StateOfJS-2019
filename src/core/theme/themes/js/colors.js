import colors from '../../colors'

export default {
    background: colors.greyDarker,
    backgroundAlt: colors.greyDarkish,
    backgroundInverted: colors.greyLight,
    text: '#e1e1e1',
    textInverted: colors.greyDarker,
    textHighlight: colors.teal,
    link: colors.teal,
    linkActive: colors.tealLighter,
    linkHover: colors.red,
    contrast: colors.red,
    border: '#5c6069',
    heatmap: colors.teal,
    lineChartDefaultColor: colors.red,
    barChartDefaultColor: colors.red,
    ranges: {
        toolExperience: {
            would_use: colors.red,
            would_not_use: colors.redLight,
            interested: colors.teal,
            not_interested: colors.tealLight,
            never_heard: colors.greyMedium
        },
        featureExperience: {
            used_it: colors.teal,
            know_not_used: colors.tealDarker,
            never_heard_not_sure: colors.greyMedium
        },
        featureExperienceSimplified: {
            know_it: colors.tealDarker,
            used_it: colors.teal
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
