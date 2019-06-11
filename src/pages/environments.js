import { graphql } from 'gatsby'
import PageTemplate from 'core/pages/PageTemplate'

export default PageTemplate

export const query = graphql`
    query environments($locale: String) {
        introduction: markdownRemark(
            frontmatter: {
                type: { eq: "introduction" }
                page: { eq: "environments" }
                locale: { eq: $locale }
            }
        ) {
            html
        }
        data: environmentsYaml(section_id: { eq: "environments" }) {
            aggregations {
                id
                environments {
                    total
                    buckets {
                        id
                        count
                        percentage
                    }
                }
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
`
