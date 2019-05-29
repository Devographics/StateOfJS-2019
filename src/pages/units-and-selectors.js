import React from 'react'
import { graphql } from 'gatsby'
import PageTemplate from '../core/pages/PageTemplate'

const UnitsAndSelectorsPage = ({ data }) => {
    return <PageTemplate data={data} />
}

export default UnitsAndSelectorsPage

export const query = graphql`
    query unitsAndSelectors($locale: String) {
        introduction: markdownRemark(
            frontmatter: {
                type: { eq: "introduction" }
                page: { eq: "units-and-selectors" }
                locale: { eq: $locale }
            }
        ) {
            html
        }
        data: unitsAndSelectorsYaml(section_id: { eq: "units-and-selectors" }) {
            aggregations {
                id
                usage {
                    total
                    buckets {
                        id
                        count
                        percentage
                    }
                }
            }
        }
    }
`
