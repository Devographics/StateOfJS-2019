import React, { useContext, useMemo } from 'react'
import { graphql } from 'gatsby'
import PageTemplate from 'core/pages/PageTemplate'
import { PageContext } from 'core/helpers/pageContext'

const FeaturesTemplate = ({ data }) => {
    const context = useContext(PageContext)
    const mappedData = useMemo(
        () => {
            const features = context.blocks
                .filter(b => b.id !== 'overview' && b.id !== 'conclusion')
                .map(b => b.id)

            return {
                ...data,
                data: {
                    ...data.data,
                    aggregations: data.data.aggregations
                        .filter(agg => features.includes(agg.id))
                        .map(agg => {
                            return {
                                id: agg.id,
                                usage: agg,
                                usageByExperience: data.data.aggregations.find(a => a.id === `${agg.id}-usage-by-xp`)
                            }
                        })
                }
            }
        },
        [context.blocks, data]
    )

    return <PageTemplate data={mappedData} />
}

export default FeaturesTemplate

export const query = graphql`
    query featuresOverviewByLocale2($section: String!, $locale: String!) {
        introduction: markdownRemark(
            frontmatter: {
                type: { eq: "introduction" }
                page: { eq: $section }
                locale: { eq: $locale }
            }
        ) {
            html
        }
        data: featuresUsageYaml(section_id: { eq: $section }) {
            aggregations {
                id
                total
                buckets {
                    id
                    count
                    percentage
                    filtered {
                        count
                        percentage
                    }
                }
            }
            fields {
                resources {
                    id
                    mdn {
                        locale
                        url
                        title
                        summary
                    }
                    caniuse {
                        title
                        spec
                        links {
                            title
                            url
                        }
                        stats {
                            browser
                            by_version {
                                version
                                support
                            }
                        }
                    }
                }
            }
        }
    }
`
