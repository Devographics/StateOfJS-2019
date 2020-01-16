import colors from '../../colors'

export default {
    background: '#e7ebf3',
    backgroundAlt: '#dae0ec',
    backgroundInverted: '#26272a',
    text: '#333333',
    textInverted: '#e7ebf3',
    textHighlight: '#000000',
    link: '#3076f6',
    linkActive: '#fb00ff',
    contrast: '#fb00ff',
    border: '#4c84ff',
    heatmap: '#b83eff',
    lineChartDefaultColor: '#3076f6',
    barChartDefaultColor: '#3076f6',
    ranges: {
        toolExperience: {
            would_use: '#436eec',
            would_not_use: '#6d9aff',
            interested: '#b83eff',
            not_interested: '#ca7eff',
            never_heard: '#dae0ec'
        },
        featureExperience: {
            used_it: '#1952b8',
            know_not_used: '#4c84ff',
            never_heard_not_sure: '#dae0ec'
        },
        featureExperienceSimplified: {
            know_it: '#4c84ff',
            used_it: '#1952b8'
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
