import { graphql } from 'gatsby'
import PageTemplate from 'core/pages/PageTemplate'

export default PageTemplate

export const query = graphql`
    query resources {
        data: learningResourcesYaml(section_id: { eq: "resources" }) {
            aggregations {
                id
                resources {
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
