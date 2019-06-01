import { graphql } from 'gatsby'
import React from 'react'
import TextBlock from 'core/blocks/TextBlock'
import TshirtBlock from 'core/blocks/TshirtBlock'
import PageHeader from 'core/pages/PageHeader'
import { useI18n } from 'core/i18n/i18nContext'

const Tshirt = ({ data }) => {

  const { translate } = useI18n()

  return (
    <>
        {/* <PageHeader /> */}
        <TextBlock className="Tshirt__Introduction" text={data.introduction.html} />
        <TshirtBlock />

    </>
)}

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
