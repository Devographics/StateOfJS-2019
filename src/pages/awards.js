import React from 'react'
import { graphql } from 'gatsby'
import AwardsBlock from 'modules/awards/AwardsBlock'
import PageHeader from 'core/pages/PageHeader'
import PageFooter from 'core/pages/PageFooter'
import TextBlock from 'core/blocks/TextBlock'

const Awards = ({ data }) => {
    return (
        <>
            <PageHeader />
            {data.introduction && <TextBlock text={data.introduction.html} />}
            <AwardsBlock data={data} />
            <PageFooter />
        </>
    )
}

export default Awards

export const query = graphql`
    query awardsByLocale($locale: String!) {
        introduction: markdownRemark(
            frontmatter: {
                type: { eq: "introduction" }
                page: { eq: "awardspage" }
                locale: { eq: $locale }
            }
        ) {
            html
        }
        features: allFeaturesUsageYaml {
            nodes {
                aggregations {
                    id
                    usage {
                        total
                        buckets {
                            id
                            count
                            percentage
                        }
                    }
                }
            }
        }
        tools: allToolsYaml {
            nodes {
                aggregations {
                    id
                    opinion {
                        total
                        buckets {
                            id
                            count
                            percentage
                        }
                    }
                }
            }
        }
        resources: allLearningResourcesYaml {
            nodes {
                aggregations {
                    id
                    resources {
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
