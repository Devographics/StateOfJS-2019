import { getLocaleStaticPaths, getLocaleByPath } from '../../lib/api/locale'
import getTranslationsByLocale from '../../lib/api/translations'
import graphqlFetch from '../../lib/api/graphql-fetch'
import getEntitiesData from '../../lib/api/get-entities-data'
import html from '../../translations/en-US/introductions/tshirt.md'

import Layout from 'core/Layout'
import PageFooter from 'core/pages/PageFooter'
import PageIntroductionBlock from 'core/blocks/other/PageIntroductionBlock'
import TshirtBlock from 'core/blocks/other/TshirtBlock'

const context = {
    id: 'tshirt',
    previous: {
        id: 'introduction',
        path: '/'
    },
    next: {
        id: 'demographics',
        path: '/demographics'
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

export default function TShirt(props) {
    return (
        <Layout pageContext={{ ...context, ...props }}>
            <main className={`Page__Contents Page__Contents--${context.id}`}>
                <PageIntroductionBlock data={html} />
                <TshirtBlock />
            </main>
            <PageFooter />
        </Layout>
    )
}
