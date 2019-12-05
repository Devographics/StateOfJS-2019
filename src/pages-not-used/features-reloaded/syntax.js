import PageTemplate from 'core/pages/PageTemplate'
import { graphql } from 'gatsby'

export default PageTemplate

export const query = graphql`
    query featuresSyntax($locale: String) {
        introduction: markdownRemark(
            frontmatter: {
                type: { eq: "introduction" }
                page: { eq: "features-syntax" }
                locale: { eq: $locale }
            }
        ) {
            html
        }
    }
`
