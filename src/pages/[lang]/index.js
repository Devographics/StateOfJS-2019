import { getLocalePaths, getLocaleByPath } from '../../lib/locale'
import getTranslationsByLocale from '../../lib/translations'
// import { getPage, getPageContext, getPageQuery } from '../../lib/_page'
import introduction from '../../translations/en-US/introductions/introduction.md'
import graphqlFetch from '../../lib/graphql-fetch'
import getEntitiesData from '../../lib/get-entities-data'

import Layout from 'core/Layout'
import PageHeader from 'core/pages/PageHeader'
import PageFooter from 'core/pages/PageFooter'
import SurveyIntroBlock from 'core/blocks/other/SurveyIntroBlock'

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
    const context = {
        id: 'introduction',
        showTitle: false,
        is_hidden: false,
        pageIndex: 0,
        next: {
            id: 'tshirt',
            showTitle: false,
            path: '/tshirt',
            pageIndex: 1
        },
        basePath: '/'
    }
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
        ...context,
        locale: locale.locale,
        localeLabel: locale.label,
        localePath: locale.path === 'default' ? '' : `/${locale.path}`,
        entities: getEntitiesData(),
        survey: survey.data.survey,
        translations
    }

    return { props }
}

export default function Index(props) {
    const { showTitle = true, id, is_hidden = false } = props

    return (
        <Layout pageContext={props}>
            {showTitle && <PageHeader />}
            <main className={`Page__Contents Page__Contents--${id}`}>
                <SurveyIntroBlock data={introduction} />
            </main>
            {!is_hidden && <PageFooter />}
        </Layout>
    )
}
