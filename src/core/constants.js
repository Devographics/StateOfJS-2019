const arrayToKeys = a => a.map(id => ({ id }))

export let colors = {
    greyLight: '#e0e4e4',
    grey: '#d9dedf',
    greyMedium: '#cecdcc',
    greyMediumer: '#616868',
    greyMediumest: '#5c6069',
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

export const toolCategories = [
    { id: 'javascript_flavors', color: colors.indigo },
    { id: 'front_end_frameworks', color: colors.pink },
    { id: 'data_layer', color: colors.red },
    { id: 'back_end_frameworks', color: colors.purple },
    { id: 'testing', color: colors.orange },
    { id: 'mobile_desktop', color: colors.olive }
]

export const featureCategories = [
    { id: 'syntax', color: colors.indigo },
    { id: 'language', color: colors.pink },
    { id: 'data_structures', color: colors.red },
    { id: 'browser_apis', color: colors.purple },
    { id: 'other_features', color: colors.orange }
]

export const getColor = id =>
    [...toolCategories, ...featureCategories].find(color => color.id === id).color

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
        id: 'used_it'
    },
    {
        id: 'know_not_used'
    },
    {
        id: 'never_heard_not_sure'
    }
]

const featureExperienceSimplified = [
    {
        id: 'know_it'
    },
    {
        id: 'used_it'
    }
]

export const toolExperience = [
    {
        id: 'would_use'
    },
    {
        id: 'would_not_use'
    },
    {
        id: 'interested'
    },
    {
        id: 'not_interested'
    },
    {
        id: 'never_heard'
    }
]

export const gender = [
    { id: 'male' },
    { id: 'female' },
    { id: 'non_binary' },
    { id: 'prefer_not_to_say' }
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
export const totalCountRounded = 20000 // used by scatterplot chart

export const websiteTitle = 'The State of JavaScript 2019'
