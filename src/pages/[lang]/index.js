import { getLocalePaths, getLocaleByPath } from '../../lib/api/locale'
import getTranslationsByLocale from '../../lib/translations'
// import { getPage, getPageContext, getPageQuery } from '../../lib/_page'
import introduction from '../../translations/en-US/introductions/introduction.md'
import graphqlFetch from '../../lib/graphql-fetch'
import getEntitiesData from '../../lib/get-entities-data'

import Layout from 'core/Layout'
import PageFooter from 'core/pages/PageFooter'
import SurveyIntroBlock from 'core/blocks/other/SurveyIntroBlock'

const context = {
    id: 'introduction',
    next: {
        id: 'tshirt',
        path: '/tshirt'
    }
}

export async function getStaticPaths() {
    return { paths: getLocalePaths(), fallback: false }
}

export async function getStaticProps({ params: { lang } }) {
    // const page = await getPage('/')
    // const context = getPageContext(page)
    // const query = getPageQuery(page)
    // console.log('MD', introduction)
    // console.log('QUERY', query)
    // console.log('CONTEXT', context)
    const locale = getLocaleByPath(lang === 'en' ? 'default' : lang)
    const translations = getTranslationsByLocale(locale.locale)
    const survey = await graphqlFetch(`${process.env.API_URL}/graphql`, {
        query: `
            query {
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
        entities: getEntitiesData(),
        survey: survey.data.survey,
        translations
    }

    return { props }
}

export default function Index(props) {
    return (
        <Layout pageContext={{ ...context, ...props }}>
            <main className={`Page__Contents Page__Contents--${context.id}`}>
                <SurveyIntroBlock data={introduction} />
            </main>
            <PageFooter />
        </Layout>
    )
}
