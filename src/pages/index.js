import { graphql } from 'gatsby'
import React from 'react'
import TextBlock from 'core/blocks/TextBlock'
import Logo from 'core/components/Logo'
import SponsorsBlock from 'core/blocks/SponsorsBlock'
import IntroductionFooter from 'core/pages/IntroductionFooter'

const Introduction = ({ data }) => (
    <>
        <Logo size="l" />
        <TextBlock text={data.introduction.html} />
        <IntroductionFooter />
        <SponsorsBlock />
    </>
)

export default Introduction

export const query = graphql`
    query introByLocale($locale: String!) {
        introduction: markdownRemark(
            frontmatter: {
                type: { eq: "introduction" }
                page: { eq: "introduction" }
                locale: { eq: $locale }
            }
        ) {
            html
        }
    }
`
