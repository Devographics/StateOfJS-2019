const arrayToKeys = a => a.map(id => ({ id }))

/*

Colors

*/
export let colors = {
    greyLight: '#e0e4e4',
    grey: '#d9dedf',
    greyMedium: '#cecdcc',
    greyMediumer: '#616868',
    greyDark: '#4d4f4f',
    greyDarkish: '#2a2d33',
    greyDarker: '#222429',

    blueLighter: '#B2BBEE',
    blueLight: '#808EE1',
    blue: '#3c52d1',
    blueDark: '#273aa2',

    pinkLightest: '#D3BBF2',
    pinkLighter: '#D68DF0',
    pinkLight: '#EC75CB',
    pink: '#F649A7',
    pinkDark: '#e86ebf',

    greenLighter: '#E7FFED',
    greenLight: '#ACFFC3',
    green: '#85EBA2',
    greenDark: '#59DF7F',

    tealLighter: '#94eeee',
    tealLight: '#65e0e0',
    teal: '#41c7c7',
    tealDark: '#2ba7a7',
    tealDarker: '#1d7e7e',

    purpleLight: '#B096E7',
    purple: '#7854C3',
    purpleDark: '#57457C',

    redLighter: '#f8a8a8',
    redLight: '#fc8f8f',
    red: '#FE6A6A',
    redDark: '#ec5555',
    redDarker: '#be3737',

    yellow: '#fbf34c',
    skyblue: '#1ea0f2',
    orange: '#EF8D33',
    olive: '#599E38',
    aqua: '#3ABBB3',
    indigo: '#4861EC',

    white: '#ffffff',

    navyLightest: '#7e86ad',
    navyLighter: '#484F73',
    navyLight: '#303652',
    navy: '#232840',
    navyDark: '#1a1f35'
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

export const distinctColors = [
    colors.indigo,
    colors.pink,
    colors.red,
    colors.purple,
    colors.orange,
    colors.olive,
    colors.skyblue,
    colors.yellow,
    colors.green,
    colors.teal
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

export const mainColors = {
    textColor: colors.grey,
    activeColor: colors.teal,
    contrastColor: colors.red
}

export const toolCategories = [
    { id: 'javascript_flavors', color: distinctColors[0] },
    { id: 'front_end_frameworks', color: distinctColors[1] },
    { id: 'data_layer', color: distinctColors[2] },
    { id: 'back_end_frameworks', color: distinctColors[3] },
    { id: 'testing', color: distinctColors[4] },
    { id: 'mobile_desktop', color: distinctColors[5] }
]

export const featureCategories = [
    { id: 'syntax', color: distinctColors[0] },
    { id: 'language', color: distinctColors[1] },
    { id: 'data_structures', color: distinctColors[2] },
    { id: 'browser_apis', color: distinctColors[3] },
    { id: 'other_features', color: distinctColors[4] }
]

export const otherColors = [
    {
        id: 'textColor',
        color: mainColors.textColor
    },
    {
        id: 'activeColor',
        color: mainColors.activeColor
    },
    {
        id: 'contrastColor',
        color: mainColors.contrastColor
    },
    {
        id: 'background',
        color: colors.greyDarker
    },
    {
        id: 'legendWithLink',
        color: mainColors.activeColor
    },
    {
        id: 'legend',
        color: colors.grey
    },
    {
        id: 'tick',
        color: mainColors.activeColor
    },
    {
        id: 'bar',
        color: mainColors.contrastColor
    },
    {
        id: 'line',
        color: mainColors.contrastColor
    },
    {
        id: 'total_respondents',
        color: mainColors.contrastColor
    },
    {
        id: 'stripe',
        color: colors.greyDarkish
    }
]

export const getColor = id =>
    [
        ...featureExperience,
        ...toolExperience,
        ...otherColors,
        ...gender,
        ...toolCategories,
        ...featureCategories
    ].find(color => color.id === id).color

/*

Keys

*/
export const salaryArray = [
    'range_work_for_free',
    'range_0_10',
    'range_10_30',
    'range_30_50',
    'range_50_100',
    'range_100_200',
    'range_more_than_200'
]

export const companySizeArray = [
    'range_1',
    'range_1_5',
    'range_5_10',
    'range_10_20',
    'range_20_50',
    'range_50_100',
    'range_100_1000',
    'range_more_than_1000'
]

export const workExperienceArray = [
    'range_less_than_1',
    'range_1_2',
    'range_2_5',
    'range_5_10',
    'range_10_20',
    'range_more_than_20'
]

export const environmentUsageArray = ['never', 'occasionally', 'often', 'mainly']

export const jobTitleArray = [
    'front_end_developer_engineer',
    'full_stack_developer_engineer',
    'back_end_developer_engineer',
    'web_developer'
]

export const zeroToFiveRange = [0, 1, 2, 3, 4]

export const cssProficiencyArray = zeroToFiveRange
export const backendProficiencyArray = zeroToFiveRange
export const opinions = [
    { id: 4, color: colors.red },
    { id: 3, color: colors.redLight },
    { id: 2, color: colors.grey },
    { id: 1, color: colors.tealLight },
    { id: 0, color: colors.teal }
]

export const featureExperience = [
    {
        id: 'used_it',
        color: colors.teal
    },
    {
        id: 'know_not_used',
        color: colors.tealDarker
    },
    {
        id: 'never_heard_not_sure',
        color: colors.greyMedium
    }
]

const featureExperienceSimplified = [
    {
        id: 'know_it',
        color: colors.tealDarker
    },
    {
        id: 'used_it',
        color: colors.teal
    }
]

export const toolExperience = [
    {
        id: 'would_use',
        color: colors.red
    },
    {
        id: 'would_not_use',
        color: colors.redLight
    },
    {
        id: 'interested',
        color: colors.teal
    },
    {
        id: 'not_interested',
        color: colors.tealLight
    },
    {
        id: 'never_heard',
        color: colors.greyMedium
    }
]

export const gender = [
    { id: 'male', color: colors.blue },
    { id: 'female', color: colors.teal },
    { id: 'non_binary', color: colors.red },
    { id: 'prefer_not_to_say', color: colors.greyMediumer }
]

export const keys = {
    salary: arrayToKeys(salaryArray),
    companySize: arrayToKeys(companySizeArray),
    workExperience: arrayToKeys(workExperienceArray),
    gender,
    environmentUsage: arrayToKeys(environmentUsageArray),
    jobTitle: arrayToKeys(jobTitleArray),
    cssProficiency: arrayToKeys(cssProficiencyArray),
    backendProficiency: arrayToKeys(backendProficiencyArray),
    opinions,
    toolExperience,
    featureExperience,
    featureExperienceSimplified,
    toolCategories
}

export const fontFamily = `'IBM Plex Mono', monospace`

export const emailOctopusUrl =
    'https://emailoctopus.com/lists/463dc2a9-b2ff-11e8-a3c9-06b79b628af2/members/embedded/1.3/add'

export const emailOctopusSiteKey = '6LdYsmsUAAAAAPXVTt-ovRsPIJ_IVhvYBBhGvRV6'

export const emailOctopusCode = 'hp463dc2a9-b2ff-11e8-a3c9-06b79b628af2'

export const totalCount = 21717

export const websiteTitle = 'The State of JavaScript 2019'
