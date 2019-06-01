import { graphql } from 'gatsby'
import PageTemplate from 'core/pages/PageTemplate'

export default PageTemplate

export const query = graphql`
    query featuresOverview($locale: String!) {
        introduction: markdownRemark(
            frontmatter: {
                type: { eq: "introduction" }
                page: { eq: "features" }
                locale: { eq: $locale }
            }
        ) {
            html
        }
        features: allFeaturesUsageYaml {
            nodes {
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
