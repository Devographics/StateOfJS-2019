export let colors = {
    greyLight: '#e0e4e4',
    grey: '#d9dedf',
    greyMedium: '#cecdcc',
    greyDark: '#AEAFB5',
    greyDarker: '#343539',

    blueLighter: '#B2BBEE',
    blueLight: '#808EE1',
    blue: '#3c52d1',
    blueDark: '#273aa2',

    pinkLightest: '#D3BBF2',
    pinkLighter: '#D68DF0',
    pinkLight: '#EC75CB',
    pink: '#ec2f95',

    greenLighter: '#E7FFED',
    greenLight: '#ACFFC3',
    green: '#85EBA2',
    greenDark: '#59DF7F',

    tealLight: '#bad9db',
    teal: '#9ac6c9',
    tealDark: '#445a5a',

    purpleLight: '#B096E7',
    purple: '#7854C3',
    purpleDark: '#57457C',

    red: '#FE6A6A',
    yellow: '#fbf34c',
    aqua: '#1ea0f2',

    white: '#ffffff'
}

export const colorRange = [
    colors.blueDark,
    colors.blue,
    colors.blueLight,
    colors.blueLighter,
    colors.pinkLightest,
    colors.pinkLighter,
    colors.pinkLight,
    colors.pink
]

export const pinkRange = [colors.pinkLightest, colors.pinkLighter, colors.pinkLight, colors.pink]
export const blueRange = [colors.blueLighter, colors.blueLight, colors.blue, colors.blueDark]

export const colorScale = [
    '#41c7c7',
    '#8be7e7',
    '#dedfec',
    '#e4d6d9',
    '#f89f9f',
    '#FE6A6A',
    '#ca4040'
]

export const salaryKeys = ['none', '0_10', '10_30', '30_50', '50_100', '100_200', '200_more']

const companySizeKeys = [
    '1',
    '1_5',
    '5_10',
    '10_20',
    '20_50',
    '50_100',
    '100_1000',
    'more_than_1000'
]

const yearsOfExperienceKeys = ['less_than_1', '1_2', '2_5', '5_10', '10_20', 'more_than_20']

const javascriptProficiencyKeys = [
    'none',
    'short_simple_javascript',
    'existing_codebases_using_modern_frameworks',
    'advanced_front_end_patterns',
    'entire_codebases_from_scratch'
]

const backendProficiencyKeys = [
    'none',
    'able_to_setup_cms_or_site_generator',
    'able_to_use_existing_frameworks',
    'able_to_setup_from_scratch'
]

const genderKeys = ['female', 'male', 'non_binary', 'prefer_not_to_say']

export const keys = {
    salary: salaryKeys,
    companySize: companySizeKeys,
    yearsOfExperience: yearsOfExperienceKeys,
    javascriptProficiency: javascriptProficiencyKeys,
    backendProficiency: backendProficiencyKeys,
    gender: genderKeys
}

export const yearsOfExperience = ['less-than-1', '1-2', '2-5', '5-10', '10-20', 'more-than-20']

export const usage = [
    {
        id: 'used_it',
        color: colors.blue
    },
    {
        id: 'know_not_used',
        color: colors.teal
    },
    {
        id: 'never_heard_not_sure',
        color: colors.greyDark
    }
]

export const opinions = [
    {
        id: 'would_use',
        color: colors.greenDark
    },
    {
        id: 'would_not_use',
        color: colors.pink
    },
    {
        id: 'interested',
        color: colors.greenLight
    },
    {
        id: 'not_interested',
        color: colors.pinkLight
    },
    {
        id: 'never_heard',
        color: colors.greyMedium
    }
]

export const verticalMargin = 30
export const innerMargin = 10
export const barHeight = 30
export const labelsWidth = 150

export const barChartProps = {
    layout: 'horizontal',
    enableGridX: true,
    enableGridY: false,
    enableLabel: false,
    reverse: false,
    enableLabels: false,
    padding: 0.8,
    borderRadius: 2.5,
    margin: {
        top: verticalMargin,
        right: innerMargin,
        bottom: verticalMargin,
        left: labelsWidth
    },
    axisTop: {
        format: '.2s'
    }
}

export const fontFamily = `'IBM Plex Mono', monospace`
