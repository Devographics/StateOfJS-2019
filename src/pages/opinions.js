import { graphql } from 'gatsby'
import PageTemplate from 'core/pages/PageTemplate'

export default PageTemplate

export const query = graphql`
    query opinions($locale: String) {
        introduction: markdownRemark(
            frontmatter: {
                type: { eq: "introduction" }
                page: { eq: "opinions" }
                locale: { eq: $locale }
            }
        ) {
            html
        }
        data: opinionsYaml(section_id: { eq: "opinions" }) {
            aggregations {
                id
                opinion {
                    completion {
                        count
                        percentage
                    }
                    buckets {
                        id
                        count
                        percentage
                    }
                }
                features {
                    completion {
                        count
                        percentage
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
`
