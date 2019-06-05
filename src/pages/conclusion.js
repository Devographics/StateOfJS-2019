import React from 'react'
import { graphql } from 'gatsby'
import TextBlock from 'core/blocks/TextBlock'
import NewsletterBlock from 'core/blocks/NewsletterBlock'
import PageHeader from 'core/pages/PageHeader'

const Conclusion = ({ data }) => (
    <>
        <PageHeader />
        <TextBlock text={data.conclusion.html} />
        <NewsletterBlock />
    </>
)

export default Conclusion

export const query = graphql`
    query conclusionByLocale($locale: String!) {
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
