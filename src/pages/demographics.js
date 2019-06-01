import PageTemplate from 'core/pages/PageTemplate'
import { graphql } from 'gatsby'

export default PageTemplate

export const query = graphql`
    query demographics($locale: String!) {
        introduction: markdownRemark(
            frontmatter: {
                type: { eq: "introduction" }
                section: { eq: "demographics" }
                locale: { eq: $locale }
            }
        ) {
            html
        }
        data: demographicsYaml(section_id: { eq: "demographics" }) {
            aggregations {
                id
                breakdown {
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
