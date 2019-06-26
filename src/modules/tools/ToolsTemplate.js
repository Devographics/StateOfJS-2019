import { graphql } from 'gatsby'
import PageTemplate from 'core/pages/PageTemplate'

export default PageTemplate

export const query = graphql`
    query toolsAndMethodologiesSectionByIdAndLocale($id: String!, $locale: String!) {
        introduction: markdownRemark(
            frontmatter: {
                type: { eq: "introduction" }
                page: { eq: $id }
                locale: { eq: $locale }
            }
        ) {
            html
        }
        data: toolsYaml(section_id: { eq: $id }) {
            aggregations {
                id
                opinion {
                    total
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
                heatmap {
                    id
                    count
                    buckets {
                        id
                        count
                        absolute_percentage
                        relative_percentage
                    }
                }
            }
            fields {
                resources {
                    id
                    entity {
                        name
                        npm
                        homepage
                        description
                    }
                    github {
                        name
                        stars
                        homepage
                        full_name
                        url
                        description
                    }
                }
            }
        }
    }
`
