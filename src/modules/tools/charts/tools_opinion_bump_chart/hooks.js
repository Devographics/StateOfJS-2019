import { useMemo } from 'react'
import { scalePoint } from 'd3-scale'
import { line as d3Line, curveBasis } from 'd3-shape'

const facets = ['awareness', 'interest', 'satisfaction']

export const useScales = ({ width, height, tools }) =>
    useMemo(
        () => ({
            xScale: scalePoint()
                .domain(facets)
                .range([0, width])
                .padding(0.5),
            yScale: scalePoint()
                .domain(tools.map((tool, i) => i + 1))
                .range([0, height])
                .padding(0.5)
        }),
        [width, height, tools]
    )

export const useLineGenerator = () => useMemo(() => d3Line().curve(curveBasis), [])
