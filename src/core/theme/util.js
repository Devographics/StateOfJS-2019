export const spacing = (multiplier = 1) => ({ theme }) => `${theme.spacing * multiplier}px`

export const fontSize = size => ({ theme }) => theme.typography.sizes[size]
