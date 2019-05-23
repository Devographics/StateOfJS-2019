import React from 'react'
import PageTemplate from 'core/pages/PageTemplate'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'

const DemographicsPage = ({ data }) => {
    return <PageTemplate data={data} />
}

export default DemographicsPage

DemographicsPage.propTypes = {
    data: PropTypes.shape({
        data: PropTypes.shape({
            aggregations: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.string.isRequired,
                    breakdown: PropTypes.shape({
                        buckets: PropTypes.arrayOf(PropTypes.shape({})).isRequired
                    }).isRequired
                })
            ).isRequired
        }).isRequired
    }).isRequired
}

export const query = graphql`
    query demographics($locale: String!) {
        introduction: markdownRemark(
            frontmatter: {
                type: { eq: "introduction" }
                section: { eq: "demographics" }
                locale: { eq: $locale }
            }
        ) {
            html
        }
        data: demographicsYaml(section_id: { eq: "demographics" }) {
            aggregations {
                id
                breakdown {
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
