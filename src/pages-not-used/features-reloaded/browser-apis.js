import PageTemplate from 'core/pages/PageTemplate'
import { graphql } from 'gatsby'

export default PageTemplate

export const query = graphql`
    query featuresBrowserApis($locale: String) {
        introduction: markdownRemark(
            frontmatter: {
                type: { eq: "introduction" }
                page: { eq: "features-browser-apis" }
                locale: { eq: $locale }
            }
        ) {
            html
        }
    }
`
