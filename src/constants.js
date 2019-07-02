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
    pink: '#F649A7',
    pinkDark: '#e86ebf',
    

    greenLighter: '#E7FFED',
    greenLight: '#ACFFC3',
    green: '#85EBA2',
    greenDark: '#59DF7F',

    tealLight: '#bad9db',
    teal: '#9ac6c9',
    tealDark: '#6a8f92',
    tealDarker: '#445a5a',

    purpleLight: '#B096E7',
    purple: '#7854C3',
    purpleDark: '#57457C',

    red: '#FE6A6A',
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

const genderKeys = ['male', 'female', 'non_binary', 'prefer_not_to_say']

const environmentUsageKeys = ['never', 'occasionally', 'often', 'mainly']

export const keys = {
    salary: salaryKeys,
    companySize: companySizeKeys,
    yearsOfExperience: yearsOfExperienceKeys,
    javascriptProficiency: javascriptProficiencyKeys,
    backendProficiency: backendProficiencyKeys,
    gender: genderKeys,
    environmentUsage: environmentUsageKeys
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
        color: colors.navyLighter
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
        color: colors.navyLighter
    }
]

export const gender = [
    { id: 'male', color: colors.blue },
    { id: 'female', color: colors.teal },
    { id: 'non_binary', color: colors.purple },
    { id: 'prefer_not_to_say', color: colors.greyMedium }
]

export const fontFamily = `'IBM Plex Mono', monospace`

export const totalCount = 11307

export const emailOctopusUrl =
    'https://emailoctopus.com/lists/ed0386c4-2f55-11e9-a3c9-06b79b628af2/members/embedded/1.3/add'

export const emailOctopusSiteKey = '6LdYsmsUAAAAAPXVTt-ovRsPIJ_IVhvYBBhGvRV6'

export const emailOctopusCode = 'hped0386c4-2f55-11e9-a3c9-06b79b628af2'
