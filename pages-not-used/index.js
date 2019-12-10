import { graphql } from 'gatsby'
import React from 'react'
import TextBlock from 'core/blocks/other/TextBlock'
import LogoFull from 'core/components/LogoFull'
import SponsorsBlock from 'core/blocks/other/SponsorsBlock'
import NewsletterBlock from 'core/blocks/other/NewsletterBlock'
import IntroductionFooter from 'core/pages/IntroductionFooter'

const Introduction = ({ data }) => (
    <>
        <div className="main-logo-wrapper">
            <LogoFull size="l" />
        </div>
        <TextBlock text={data.introduction.html} />
        <IntroductionFooter />
        <NewsletterBlock />
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
