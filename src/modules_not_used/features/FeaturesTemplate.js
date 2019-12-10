import { graphql } from 'gatsby'
import PageTemplate from 'core/pages/PageTemplate'

export default PageTemplate

export const query = graphql`
    query featuresOverviewByLocale2($section: String!, $locale: String!) {
        introduction: markdownRemark(
            frontmatter: {
                type: { eq: "introduction" }
                page: { eq: $section }
                locale: { eq: $locale }
            }
        ) {
            html
        }
        data: featuresUsageYaml(section_id: { eq: $section }) {
            aggregations {
                id
                usage {
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
                heatmap {
                    id
                    count
                    buckets {
                        id
                        count
                        absolute_percentage
                        relative_percentage
                    }
                }
            }
            fields {
                resources {
                    id
                    mdn {
                        locale
                        url
                        title
                        summary
                    }
                    caniuse {
                        title
                        spec
                        # links {
                        #     title
                        #     url
                        # }
                        # stats {
                        #     browser
                        #     by_version {
                        #         version
                        #         support
                        #     }
                        # }
                    }
                }
            }
        }
    }
`
