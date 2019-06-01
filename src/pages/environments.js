import { graphql } from 'gatsby'
import PageTemplate from 'core/pages/PageTemplate'

export default PageTemplate

export const query = graphql`
    query environments {
        data: environmentsYaml(section_id: { eq: "environments" }) {
            aggregations {
                id
                environments {
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
