import React from 'react'
import { graphql } from 'gatsby'
import TextBlock from '../core/blocks/TextBlock'
import PageHeader from 'core/pages/PageHeader'

const Conclusion = ({ data }) => (
    <>
        <PageHeader />
        <TextBlock text={data.conclusion.html} />
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
