import React from 'react'
import { graphql } from 'gatsby'
import PageTemplate from 'core/pages/PageTemplate'

const ToolsAndMethodologyPage = ({ data }) => {
    return <PageTemplate data={data} />
}

export default ToolsAndMethodologyPage

export const query = graphql`
    query toolsOverview($locale: String!) {
        introduction: markdownRemark(
            frontmatter: {
                type: { eq: "introduction" }
                page: { eq: "technologies" }
                locale: { eq: $locale }
            }
        ) {
            html
        }
        tools: allToolsYaml {
            nodes {
                section_id
                aggregations {
                    id
                    opinion {
                        total
                        buckets {
                            id
                            count
                        }
                    }
                }
            }
        }
    }
`
