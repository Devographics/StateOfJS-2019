import { getLocaleStaticPaths, getLocaleByPath } from '../../lib/api/locale'
import getTranslationsByLocale from '../../lib/api/translations'
import graphqlFetch from '../../lib/api/graphql-fetch'
import getEntitiesData from '../../lib/api/get-entities-data'
import html from '../../translations/en-US/introductions/introduction.md'

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
    return { paths: getLocaleStaticPaths(), fallback: false }
}

export async function getStaticProps({ params: { lang } }) {
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
                <SurveyIntroBlock data={html} />
            </main>
            <PageFooter />
        </Layout>
    )
}
