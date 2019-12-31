import React from 'react'
import { ResponsiveSankey } from '@nivo/sankey'
import theme from 'nivoTheme'
import { colors, toolExperience } from 'core/constants'

const getColor = d => {
    // is a node
    if (d.id) {
        const xp = toolExperience.find(i => i.id === d.experience)

        return xp.color
    }

    // the returned color for links does not really matter
    // as gradients are enabled
    return '#000000'
}

const YearLabel = ({ year, x }) => (
    <text fill={colors.grey} textAnchor="middle" x={x} fontSize={16}>
        {year}
    </text>
)

const YearsLayer = ({ nodes, height }) => {
    const allYears = []
    nodes.forEach(node => {
        if (!allYears.includes(node.year)) {
            allYears.push(node.year)
        }
    })
    allYears.sort()

    const yearLegends = allYears.map(year => {
        const node = nodes.find(n => n.year === year)

        return {
            year,
            x: node.x0 + (node.x1 - node.x0) / 2
        }
    })

    return (
        <>
            <g transform="translate(0, -26)">
                {yearLegends.map(yearLegend => (
                    <YearLabel key={yearLegend.year} year={yearLegend.year} x={yearLegend.x} />
                ))}
            </g>
            {yearLegends.map(yearLegend => (
                <rect
                    key={yearLegend.year}
                    fill="black"
                    fillOpacity={0.3}
                    x={yearLegend.x - 18}
                    y={-9}
                    width={36}
                    height={height + 18}
                />
            ))}
            <g transform={`translate(0, ${height + 36})`}>
                {yearLegends.map(yearLegend => (
                    <YearLabel key={yearLegend.year} year={yearLegend.year} x={yearLegend.x} />
                ))}
            </g>
        </>
    )
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
            linkContract={1}
            linkBlendMode="screen"
            enableLinkGradient
            linkOpacity={0.75}
            linkHoverOpacity={1}
        />
    )
}

export default ToolExperienceGraphChart
