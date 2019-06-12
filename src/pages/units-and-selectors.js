import { graphql } from 'gatsby'
import PageTemplate from '../core/pages/PageTemplate'

export default PageTemplate

export const query = graphql`
    query unitsAndSelectors($locale: String) {
        introduction: markdownRemark(
            frontmatter: {
                type: { eq: "introduction" }
                page: { eq: "units-and-selectors" }
                locale: { eq: $locale }
            }
        ) {
            html
        }
        data: unitsAndSelectorsYaml(section_id: { eq: "units-and-selectors" }) {
            aggregations {
                id
                usage {
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
            }
        }
    }
`
