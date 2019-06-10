import React from 'react'
import Award from './Award'
// import staticAwards from 'data/static_awards.yml'

const staticAwards = {
    prediction: [{ id: 'tailwind' }, { id: 'emotion' }, { id: 'it-css' }],
    special: [{ id: 'visual-studio' }, { id: 'storybook' }, { id: 'nextjs' }]
}

const AwardsBlock = ({ data }) => {
    // const highestSatisfaction = data.awards.edges.find(d => d.node.type === 'highest_satisfaction')
    // const highestInterest = data.awards.edges.find(d => d.node.type === 'highest_interest')
    // const highestUsage = data.awards.edges.find(d => d.node.type === 'highest_usage')
    // const mostMentioned = data.awards.edges.find(d => d.node.type === 'most_mentioned')
    const awards = data.awards.edges
    return (
        <div className="Block Block--Awards Awards__Block">
            {awards.map(award => (
                <Award key={award.node.type} type={award.node.type} tools={award.node.tools} />
            ))}

            {/* <Award type="highest_satisfaction" tools={highestSatisfaction.node.tools} />
            <Award type="highest_interest" tools={highestInterest.node.tools} /> */}

            {/* <Award type="most_adopted_feature" tools={mostMentioned.node.tools} /> */}

            {/* <Award type="most_used_resource" tools={mostMentioned.node.tools} /> */}

            {/* <Award type="highest_paying_tool" tools={mostMentioned.node.tools} /> */}

            <Award type="prediction" tools={staticAwards.prediction} />

            <Award type="special" tools={staticAwards.special} />
        </div>
    )
}

export default AwardsBlock
