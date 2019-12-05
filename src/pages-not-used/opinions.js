import { graphql } from 'gatsby'
import PageTemplate from 'core/pages/PageTemplate'
import React from 'react'

export default props => {
    let opinionsByYear = props.data.opinions.opinions
    opinionsByYear = opinionsByYear
        .filter(opinionByYear => {
            const year = opinionByYear.byYear.find(d => d.year === 2018)

            return year !== undefined
        })
        .map(opinionByYear => {
            const year = opinionByYear.byYear.find(d => d.year === 2018)

            return {
                id: opinionByYear.id,
                opinion: {
                    completion: {
                        count: year.total,
                        percentage: year.completion
                    },
                    buckets: year.buckets.map(b => ({
                        ...b,
                        id: `${b.id}`
                    }))
                }
            }
        })

    const data = {
        ...props.data,
        data: {
            ...props.data.data,
            aggregations: [...opinionsByYear, ...props.data.data.aggregations]
        }
    }

    console.log(data.data.aggregations)

    return <PageTemplate {...props} data={data} />
}

export const query = graphql`
    query opinions($locale: String) {
        introduction: markdownRemark(
            frontmatter: {
                type: { eq: "introduction" }
                page: { eq: "opinions" }
                locale: { eq: $locale }
            }
        ) {
            html
        }
        opinions: stateOfApi {
            opinions(
                ids: [
                    "would_like_js_to_be_main_lang"
                    "enjoy_building_js_apps"
                    "js_ecosystem_changing_to_fast"
                    "js_over_used_online"
                    "building_js_apps_overly_complex"
                    "js_moving_in_right_direction"
                ]
            ) {
                id
                byYear {
                    year
                    total
                    completion{
                        percentage
                        count
                    }
                    buckets {
                        id
                        count
                        percentage
                    }
                }
            }
        }
        data: opinionsYaml(section_id: { eq: "opinions" }) {
            aggregations {
                id
                features {
                    completion {
                        count
                        percentage
                    }
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
