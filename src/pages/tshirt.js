import { graphql } from 'gatsby'
import React from 'react'
import TextBlock from 'core/blocks/TextBlock'
import TshirtBlock from 'core/blocks/TshirtBlock'
import PageFooter from 'core/pages/PageFooter'

const Tshirt = ({ data }) => (
    <>
        <TextBlock className="Tshirt__Introduction" text={data.introduction.html} />
        <TshirtBlock />
        <PageFooter />
    </>
)

export default Tshirt

export const query = graphql`
    query tshirtIntro($locale: String!) {
        introduction: markdownRemark(
            frontmatter: {
                type: { eq: "introduction" }
                page: { eq: "tshirt" }
                locale: { eq: $locale }
            }
        ) {
            html
        }
    }
`
