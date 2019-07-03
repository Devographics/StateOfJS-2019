import React, { memo, useMemo } from 'react'
import { sortBy } from 'lodash'
import PropTypes from 'prop-types'
import { useEntities } from 'core/entities/entitiesContext'
import Award from './Award'

const getBlockData = (data, getName) => {
    const features = data.features.nodes.reduce(
        (acc, section) => [...acc, ...section.aggregations.filter(agg => agg.usage !== null)],
        []
    )

    const featureAdoption = sortBy(features, feature => {
        const usageBucket = feature.usage.buckets.find(b => b.id === 'used_it')
        return usageBucket.count
    })
        .reverse()
        .slice(0, 3)
        .map(feature => {
            const usageBucket = feature.usage.buckets.find(b => b.id === 'used_it')

            return {
                id: feature.id,
                name: getName(feature.id),
                value: usageBucket.count
            }
        })

    const tools = data.tools.nodes.reduce(
        (acc, section) => [
            ...acc,
            ...section.aggregations
                .filter(agg => agg.opinion !== null)
                .map(agg => {
                    const wouldUseBucket = agg.opinion.buckets.find(b => b.id === 'would_use')
                    const wouldNotUseBucket = agg.opinion.buckets.find(
                        b => b.id === 'would_not_use'
                    )

                    const interestedBucket = agg.opinion.buckets.find(b => b.id === 'interested')
                    const notInterestedBucket = agg.opinion.buckets.find(
                        b => b.id === 'not_interested'
                    )

                    const usage = wouldUseBucket.count + wouldNotUseBucket.count
                    const satisfaction = Number(((wouldUseBucket.count / usage) * 100).toFixed(2))
                    const interest = Number(
                        (
                            (interestedBucket.count /
                                (interestedBucket.count + notInterestedBucket.count)) *
                            100
                        ).toFixed(2)
                    )

                    return {
                        ...agg,
                        name: getName(agg.id),
                        usage,
                        satisfaction,
                        interest
                    }
                })
        ],
        []
    )

    const toolUsage = sortBy(tools, 'usage')
        .reverse()
        .slice(0, 3)
        .map(tool => ({
            id: tool.id,
            name: tool.name,
            value: tool.usage
        }))
    const toolSatisfaction = sortBy(tools, 'satisfaction')
        .reverse()
        .slice(0, 3)
        .map(tool => ({
            id: tool.id,
            name: tool.name,
            value: tool.satisfaction
        }))
    const toolInterest = sortBy(tools, 'interest')
        .reverse()
        .slice(0, 3)
        .map(tool => ({
            id: tool.id,
            name: tool.name,
            value: tool.interest
        }))

    const resources = []
    data.resources.nodes[0].aggregations
        .filter(agg => agg.resources !== null)
        .forEach(section => {
            section.resources.buckets.forEach(bucket => {
                resources.push({
                    ...bucket,
                    name: bucket.id
                })
            })
        })

    const resourceUsage = sortBy(resources, 'count')
        .reverse()
        .slice(0, 3)
        .map(resource => ({
            id: resource.id,
            name: resource.name,
            value: resource.count
        }))

    return [
        {
            type: 'feature-adoption',
            items: featureAdoption,
        },
        {
            type: 'tool-usage',
            items: toolUsage
        },
        {
            type: 'tool-satisfaction',
            items: toolSatisfaction
        },
        {
            type: 'tool-interest',
            items: toolInterest
        },
        {
            type: 'resource-usage',
            items: resourceUsage
        }
    ]
}

const AwardsBlock = ({ data }) => {
    const { getName } = useEntities()
    const awards = useMemo(() => getBlockData(data, getName), [data, getName])

    return (
        <div className="Block Block--Awards Awards__Block">
            {awards.map(award => (
                <Award key={award.type} type={award.type} items={award.items} />
            ))}
        </div>
    )
}

AwardsBlock.propTypes = {
    data: PropTypes.shape({
        features: PropTypes.shape({
            nodes: PropTypes.arrayOf(
                PropTypes.shape({
                    aggregations: PropTypes.arrayOf(
                        PropTypes.shape({
                            id: PropTypes.string.isRequired,
                            usage: PropTypes.shape({
                                buckets: PropTypes.arrayOf(
                                    PropTypes.shape({
                                        id: PropTypes.string.isRequired,
                                        count: PropTypes.number.isRequired,
                                        percentage: PropTypes.number.isRequired
                                    })
                                ).isRequired
                            })
                        })
                    ).isRequired
                })
            ).isRequired
        }).isRequired,
        tools: PropTypes.shape({
            nodes: PropTypes.arrayOf(
                PropTypes.shape({
                    aggregations: PropTypes.arrayOf(
                        PropTypes.shape({
                            id: PropTypes.string.isRequired,
                            opinion: PropTypes.shape({
                                buckets: PropTypes.arrayOf(
                                    PropTypes.shape({
                                        id: PropTypes.string.isRequired,
                                        count: PropTypes.number.isRequired,
                                        percentage: PropTypes.number.isRequired
                                    })
                                ).isRequired
                            })
                        })
                    ).isRequired
                })
            ).isRequired
        }).isRequired,
        resources: PropTypes.shape({
            nodes: PropTypes.arrayOf(
                PropTypes.shape({
                    aggregations: PropTypes.arrayOf(
                        PropTypes.shape({
                            id: PropTypes.string.isRequired,
                            opinion: PropTypes.shape({
                                buckets: PropTypes.arrayOf(
                                    PropTypes.shape({
                                        id: PropTypes.string.isRequired,
                                        count: PropTypes.number.isRequired
                                    })
                                ).isRequired
                            })
                        })
                    ).isRequired
                })
            ).isRequired
        }).isRequired
    }).isRequired
}

export default memo(AwardsBlock)
