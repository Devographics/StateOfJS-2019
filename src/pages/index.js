import getTranslationsByLocale from '../lib/translations'
import { getLocaleByPath } from '../lib/locale'
// import { getPage, getPageContext, getPageQuery } from '../lib/_page'
import introduction from '../translations/en-US/introductions/introduction.md'
import graphqlFetch from '../lib/graphql-fetch'
import getEntitiesData from '../lib/get-entities-data'

export async function getStaticProps() {
    // const page = await getPage('/')
    // const context = getPageContext(page)
    // const query = getPageQuery(page)
    // console.log('MD', introduction)
    // console.log('QUERY', query)
    // console.log('CONTEXT', context)
    const locale = getLocaleByPath('default')
    const translations = getTranslationsByLocale(locale.locale)
    const context = {
        id: 'introduction',
        showTitle: false,
        blocks: [
            {
                blockType: 'SurveyIntroBlock',
                dataPath: 'introduction_introduction.html',
                id: 'survey_intro',
                variables: [Object],
                template: 'pageIntroductionTemplate',
                path: '/survey_intro/'
            }
        ],
        is_hidden: false,
        pageIndex: 0,
        defaultBlockType: 'default',
        next: {
            id: 'tshirt',
            showTitle: false,
            path: '/tshirt/',
            pageIndex: 1,
            defaultBlockType: 'default'
        },
        basePath: '/'
    }
    const survey = await graphqlFetch(process.env.API_URL, {
        query: `
            surveyApi {
                survey(survey: js) {
                    tools {
                        id
                        entity {
                            name
                        }
                    }
                }
            }
        `
    })
    const props = {
        ...context,
        locale: locale.locale,
        localeLabel: locale.label,
        localePath: locale.path === 'default' ? '' : `/${locale.path}`,
        pageData: {
            introduction_introduction: {
                html: introduction
            }
        },
        entities: getEntitiesData(),
        survey,
        translations
    }

    return { props }
}

export default function Index(props) {
    // console.log('PROPS', props)
    return null
}
