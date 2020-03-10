import { getLocaleStaticPaths, getLocaleByPath } from '../../lib/api/locale'
import getTranslationsByLocale from '../../lib/api/translations'
// import { getPage, getPageContext, getPageQuery } from '../../lib/api/_page'
import graphqlFetch from '../../lib/api/graphql-fetch'
import getEntitiesData from '../../lib/api/get-entities-data'
import { tools } from '../../lib/static-data/shared'
import { demographics } from '../../lib/static-data/demographics'
import html from '../../translations/en-US/introductions/demographics.md'

import Layout from 'core/Layout'
import PageFooter from 'core/pages/PageFooter'
import PageIntroductionBlock from 'core/blocks/other/PageIntroductionBlock'
import ParticipationByCountryBlock from 'core/blocks/demographics/ParticipationByCountryBlock'

const context = {
    id: 'tshirt',
    previous: {
        id: 'introduction',
        path: '/'
    },
    next: {
        id: 'demographics',
        path: '/demographics/'
    }
}

export async function getStaticPaths() {
    return { paths: getLocaleStaticPaths(), fallback: false }
}

export async function getStaticProps({ params: { lang } }) {
    // const page = await getPage('/demographics/')
    // const context = getPageContext(page)
    // const query = getPageQuery(page)
    // console.log('CONTEXT', context)
    // console.log('QUERY', query)
    const locale = getLocaleByPath(lang === 'en' ? 'default' : lang)
    const translations = getTranslationsByLocale(locale.locale)
    const survey = await graphqlFetch(`${process.env.API_URL}/graphql`, {
        query: `
            query {
                ${tools.query}
                ${demographics.country.query}
                ${demographics.salary.query}
                ${demographics.workExperience.query}
                ${demographics.companySize.query}
                ${demographics.source.query}
                ${demographics.gender.query}
                ${demographics.jobTitle.query}
                ${demographics.cssProficiency.query}
                ${demographics.backendProficiency.query}
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

export default function Demographics(props) {
    const { survey } = props

    return (
        <Layout pageContext={{ ...context, ...props }}>
            <main className={`Page__Contents Page__Contents--${context.id}`}>
                <PageIntroductionBlock data={html} />
                <ParticipationByCountryBlock
                    block={demographics.country}
                    data={survey.demographics.country.year}
                />
            </main>
            <PageFooter />
        </Layout>
    )
}
