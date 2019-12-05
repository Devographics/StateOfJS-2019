import PageTemplate from 'core/pages/PageTemplate'
import { graphql } from 'gatsby'

export default PageTemplate

export const query = graphql`
    query featuresDataStructures($locale: String) {
        introduction: markdownRemark(
            frontmatter: {
                type: { eq: "introduction" }
                page: { eq: "features-data-structures" }
                locale: { eq: $locale }
            }
        ) {
            html
        }
    }
`
