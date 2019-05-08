import React from 'react'
import { graphql } from 'gatsby'
import PageTemplate from 'core/pages/PageTemplate'

const OpinionsPage = ({ data }) => {
    return <PageTemplate data={data} />
}

export default OpinionsPage

export const query = graphql`
    query opinions {
        data: opinionsYaml(section_id: { eq: "opinions" }) {
            aggregations {
                id
                opinion {
                    buckets {
                        id
                        count
                        percentage
                    }
                }
                features {
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
