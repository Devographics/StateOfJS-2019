import React from 'react'
import { ResponsiveSankey } from '@nivo/sankey'
import theme from 'nivoTheme'
import { toolExperience } from 'core/constants'
import YearsLayer from './YearsLayer'
import NodeTooltip from './NodeTooltip'
import LinkTooltip from './LinkTooltip'

const getColor = d => {
    // it's a node
    if (d.id) {
        return toolExperience.find(i => i.id === d.experience).color
    }

    // otherwise it's a link
    // the returned color for links does not matter as link gradients
    // are enabled and will use source/target node colors
    return '#000000'
}

const ToolExperienceGraphChart = ({ data }) => {
    const links = data.links.map(link => ({
        ...link,
        value: link.count
    }))

    return (
        <ResponsiveSankey
            layers={[YearsLayer, 'links', 'nodes', 'labels', 'legends']}
            margin={{ top: 60, right: 16, bottom: 40, left: 16 }}
            data={{
                nodes: data.nodes,
                links
            }}
            sort="auto"
            align="center"
            theme={theme}
            colors={getColor}
            animate={false}
            enableLabels={false}
            nodeThickness={20}
            nodeSpacing={12}
            nodeOpacity={1}
            nodeBorderWidth={0}
            nodeInnerPadding={2}
            nodeTooltip={node => <NodeTooltip {...node}/>}
            linkContract={1}
            linkBlendMode="screen"
            enableLinkGradient
            linkOpacity={0.75}
            linkHoverOpacity={1}
            linkTooltip={link => <LinkTooltip {...link} />}
        />
    )
}

export default ToolExperienceGraphChart
