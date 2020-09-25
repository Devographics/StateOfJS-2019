export const spacing = (multiplier = 1) => ({ theme }) => `${theme.spacing * multiplier}px`

export const fontSize = size => ({ theme }) => theme.typography.sizes[size]

export const fontWeight = weight => ({ theme }) => theme.typography.weights[weight]

export const color = id => ({ theme }) => theme.colors[id]
