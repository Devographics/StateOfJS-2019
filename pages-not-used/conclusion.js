import React from 'react'
import { graphql } from 'gatsby'
import TextBlock from 'core/blocks/other/TextBlock'
import NewsletterBlock from 'core/blocks/NewsletterBlock'
import PageHeader from 'core/pages/PageHeader'
import PageFooter from 'core/pages/PageFooter'

const Conclusion = ({ data }) => (
    <>
        <PageHeader />
        <TextBlock text={data.conclusion.html} />
        <NewsletterBlock />
        <PageFooter />
    </>
)

export default Conclusion

export const query = graphql`
    query conclusionByLocale($locale: String) {
        conclusion: markdownRemark(
            frontmatter: {
                type: { eq: "conclusion" }
                page: { eq: "conclusion" }
                locale: { eq: $locale }
            }
        ) {
            html
        }
    }
`
