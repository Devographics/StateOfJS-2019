import React from 'react'
import { graphql } from 'gatsby'
import PageTemplate from 'core/pages/PageTemplate'

const FeaturesPage = ({ data }) => {
    return <PageTemplate data={data} />
}

export default FeaturesPage

export const query = graphql`
    query featuresOverview($locale: String!) {
        introduction: markdownRemark(
            frontmatter: {
                type: { eq: "introduction" }
                page: { eq: "layout" }
                locale: { eq: $locale }
            }
        ) {
            html
        }
        features: allFeaturesUsageYaml {
          nodes{
            section_id
            aggregations {
                id
                usage {
                    total
                    buckets {
                        id
                        count
                    }
                }
            }
          }
        }
    }
`
