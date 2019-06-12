import React from 'react'
import { graphql } from 'gatsby'
import AwardsBlock from 'modules/awards/AwardsBlock'
import PageHeader from 'core/pages/PageHeader'
import TextBlock from 'core/blocks/TextBlock'

const Awards = ({ data }) => {
    return (
        <>
            <PageHeader />
            {data.introduction && <TextBlock text={data.introduction.html} />}
            {/* <AwardsBlock data={data} /> */}
        </>
    )
}

export default Awards

export const query = graphql`
    query awardsByLocale($locale: String!) {
        introduction: markdownRemark(
            frontmatter: {
                type: { eq: "introduction" }
                page: { eq: "awardspage" }
                locale: { eq: $locale }
            }
        ) {
            html
        }
        awards: allAwardsYaml(filter: { type: { ne: null } }) {
            edges {
                node {
                    type
                    tools {
                        id
                        percentage
                        count
                    }
                }
            }
        }
    }
`
