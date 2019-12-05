import React from 'react'
import PageTemplate from 'core/pages/PageTemplate'
import { graphql } from 'gatsby'

export default props => {
    console.log(props.data.data)
    const companySize = props.data.demographics.demographics.companySize.find(d => d.year === 2018)
    const yearsOfExperience = props.data.demographics.demographics.yearsOfExperience.find(
        d => d.year === 2018
    )
    const salary = props.data.demographics.demographics.salary.find(d => d.year === 2018)
    const gender = props.data.demographics.demographics.gender.find(d => d.year === 2018)

    const data = {
        ...props.data,
        data: {
            aggregations: [
                ...props.data.data.aggregations,
                {
                    id: 'company-size',
                    breakdown: {
                        ...companySize,
                        completion: {
                            count: companySize.total,
                            percentage: companySize.completion
                        }
                    }
                },
                {
                    id: 'years-of-experience',
                    breakdown: {
                        ...yearsOfExperience,
                        completion: {
                            count: yearsOfExperience.total,
                            percentage: yearsOfExperience.completion
                        }
                    }
                },
                {
                    id: 'salary',
                    breakdown: {
                        ...salary,
                        completion: {
                            count: salary.total,
                            percentage: salary.completion
                        }
                    }
                },
                {
                    id: 'gender',
                    breakdown: {
                        ...gender,
                        completion: {
                            count: gender.total,
                            percentage: gender.completion
                        }
                    }
                }
            ]
        }
    }

    return <PageTemplate {...props} data={data} />
}

export const query = graphql`
    query demographics($locale: String) {
        introduction: markdownRemark(
            frontmatter: {
                type: { eq: "introduction" }
                section: { eq: "demographics" }
                locale: { eq: $locale }
            }
        ) {
            html
        }
        demographics: stateOfApi {
            demographics {
                companySize {
                    year
                    total
                    completion {
                        percentage
                        count
                    }
                    buckets {
                        id
                        count
                        percentage
                    }
                }
                yearsOfExperience {
                    year
                    total
                    completion {
                        percentage
                        count
                    }
                    buckets {
                        id
                        count
                        percentage
                    }
                }
                salary {
                    year
                    total
                    completion {
                        percentage
                        count
                    }
                    buckets {
                        id
                        count
                        percentage
                    }
                }
                gender {
                    year
                    total
                    completion {
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
        data: demographicsYaml(section_id: { eq: "demographics" }) {
            aggregations {
                id
                breakdown {
                    total
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
