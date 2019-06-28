import React from 'react'
import { graphql } from 'gatsby'
import { sortBy } from 'lodash'
import AwardsBlock from 'modules/awards/AwardsBlock'
import PageHeader from 'core/pages/PageHeader'
import PageFooter from 'core/pages/PageFooter'
import TextBlock from 'core/blocks/TextBlock'

const getPageData = data => {
    const features = data.features.nodes.reduce((acc, section) => [
        ...acc,
        ...section.aggregations
            .filter(agg => agg.usage !== null)
    ], [])

    const featureUsage = sortBy(features, feature => {
        const usageBucket = feature.usage.buckets.find(b => b.id === 'used_it')
        return usageBucket.percentage
    }).reverse().slice(0, 3).map(feature => {
        const usageBucket = feature.usage.buckets.find(b => b.id === 'used_it')

        return {
            id: feature.id,
            value: usageBucket.percentage
        }
    })

    const tools = data.tools.nodes.reduce((acc, section) => [
        ...acc,
        ...section.aggregations
            .filter(agg => agg.opinion !== null)
            .map(agg => {
                const total = agg.opinion.total

                const wouldUseBucket = agg.opinion.buckets.find(b => b.id === 'would_use')
                const wouldNotUseBucket = agg.opinion.buckets.find(b => b.id === 'would_not_use')

                const interestedBucket = agg.opinion.buckets.find(b => b.id === 'interested')
                const notInterestedBucket = agg.opinion.buckets.find(b => b.id === 'not_interested')

                const usage = Number(((wouldUseBucket.count + wouldNotUseBucket.count) / total * 100).toFixed(2))
                const satisfaction = Number((wouldUseBucket.count / (wouldUseBucket.count + wouldNotUseBucket.count) * 100).toFixed(2))
                const interest = Number((interestedBucket.count / (interestedBucket.count + notInterestedBucket.count) * 100).toFixed(2))

                return {
                    ...agg,
                    usage,
                    satisfaction,
                    interest
                }
            })
    ], [])

    const toolsUsage = sortBy(tools, 'usage').reverse().slice(0, 3).map(tool => ({
        id: tool.id,
        value: tool.usage
    }))
    const toolsSatisfaction = sortBy(tools, 'satisfaction').reverse().slice(0, 3).map(tool => ({
        id: tool.id,
        value: tool.satisfaction
    }))
    const toolsInterest = sortBy(tools, 'interest').reverse().slice(0, 3).map(tool => ({
        id: tool.id,
        value: tool.interest
    }))

    return {
        features,
        tools,
        featureUsage,
        toolsUsage,
        toolsSatisfaction,
        toolsInterest
    }
}

const Awards = ({ data }) => {
    console.log(data)

    const computed = getPageData(data)
    console.log(computed)

    return (
        <>
            <PageHeader />
            {data.introduction && <TextBlock text={data.introduction.html} />}
            {/* <AwardsBlock data={data} /> */}
            <PageFooter />
        </>
    )
}

export default Awards

export const query = graphql`
    query awardsByLocale($locale: String!) {
        introduction: markdownRemark(
            frontmatter: {
                type: { eq: "introduction" }
                page: { eq: "awardspage" }
                locale: { eq: $locale }
            }
        ) {
            html
        }
        features: allFeaturesUsageYaml {
            nodes {
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
        tools: allToolsYaml {
            nodes {
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
