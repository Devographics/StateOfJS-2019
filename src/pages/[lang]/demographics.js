import { getLocaleStaticPaths, getLocaleByPath } from '../../lib/api/locale'
import getTranslationsByLocale from '../../lib/translations'
import { getPage, getPageContext, getPageQuery } from '../../lib/_page'
import html from '../../translations/en-US/introductions/demographics.md'
import graphqlFetch from '../../lib/graphql-fetch'
import getEntitiesData from '../../lib/get-entities-data'

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
        path: '/demographics/'
    }
}

export async function getStaticPaths() {
    return { paths: getLocaleStaticPaths(), fallback: false }
}

export async function getStaticProps({ params: { lang } }) {
    const page = await getPage('/demographics/')
    const context = getPageContext(page)
    const query = getPageQuery(page)
    console.log('CONTEXT', context)
    console.log('QUERY', query)
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
                    demographics {
                        country {
                            year(year: 2019) {
                                year
                                total
                                completion {
                                    percentage
                                    count
                                }
                                buckets {
                                    id
                                    count
                                    percentage
                                }
                            }
                        }
                        salary {
                            year(year: 2019) {
                                year
                                total
                                completion {
                                    percentage
                                    count
                                }
                                buckets {
                                    id
                                    count
                                    percentage
                                }
                            }
                        }
                        workExperience {
                            year(year: 2019) {
                                year
                                total
                                completion {
                                    percentage
                                    count
                                }
                                buckets {
                                    id
                                    count
                                    percentage
                                }
                            }
                        }
                        companySize {
                            year(year: 2019) {
                                year
                                total
                                completion {
                                    percentage
                                    count
                                }
                                buckets {
                                    id
                                    count
                                    percentage
                                }
                            }
                        }
                        source {
                            year(year: 2019) {
                                year
                                total
                                completion {
                                    percentage
                                    count
                                }
                                buckets {
                                    id
                                    count
                                    percentage
                                    entity {
                                        name
                                        homepage
                                        github {
                                            url
                                        }
                                    }
                                }
                            }
                        }
                        gender {
                            year(year: 2019) {
                                year
                                total
                                completion {
                                    percentage
                                    count
                                }
                                buckets {
                                    id
                                    count
                                    percentage
                                }
                            }
                        }
                        jobTitle {
                            year(year: 2019) {
                                year
                                total
                                completion {
                                    percentage
                                    count
                                }
                                buckets {
                                    id
                                    count
                                    percentage
                                }
                            }
                        }
                        cssProficiency {
                            year(year: 2019) {
                                year
                                total
                                completion {
                                    percentage
                                    count
                                }
                                buckets {
                                    id
                                    count
                                    percentage
                                }
                            }
                        }
                        backendProficiency {
                            year(year: 2019) {
                                year
                                total
                                completion {
                                    percentage
                                    count
                                }
                                buckets {
                                    id
                                    count
                                    percentage
                                }
                            }
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

export default function Demographics(props) {
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
