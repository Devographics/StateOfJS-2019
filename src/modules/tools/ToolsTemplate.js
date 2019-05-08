import React from 'react'
import { graphql } from 'gatsby'
import PageTemplate from 'core/pages/PageTemplate'

const ToolsTemplate = ({ data }) => {
    return <PageTemplate data={data} />
}

export default ToolsTemplate

export const query = graphql`
    query toolsAndMethodologiesSectionByIdAndLocale($id: String!, $locale: String!) {
        introduction: markdownRemark(
            frontmatter: {
                type: { eq: "introduction" }
                page: { eq: $id }
                locale: { eq: $locale }
            }
        ) {
            html
        }
        data: toolsYaml(section_id: { eq: $id }) {
            aggregations {
                id
                opinion {
                    total
                    buckets {
                        id
                        count
                        percentage
                    }
                }
                others {
                    total
                    buckets {
                        id
                        count
                        percentage
                    }
                }
            }
            fields {
                resources {
                    id
                }
            }
        }
    }
`
