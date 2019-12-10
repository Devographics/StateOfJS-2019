import React from 'react'
import Cell from './LogoCell.js'
import { getColor } from 'core/constants.js'

const Logo = ({ width = '100%' }) => (
    <svg width={width} viewBox="0 0 492 296" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Cell px={0} py={0} text="St" color={getColor('textColor')} />
        <Cell px={1} py={0} text="At" color={getColor('textColor')} />
        <Cell px={2} py={0} text="E" color={getColor('textColor')} />
        <Cell px={4} py={0} text="Of" color={getColor('textColor')} />
        <Cell px={0} py={1} text="Ja" color={getColor('activeColor')} />
        <Cell px={1} py={1} text="Va" color={getColor('activeColor')} />
        <Cell px={2} py={1} text="Sc" color={getColor('activeColor')} />
        <Cell px={3} py={1} text="Ri" color={getColor('activeColor')} />
        <Cell px={4} py={1} text="Pt" color={getColor('activeColor')} />
        <Cell px={2} py={2} text="20" color={getColor('contrastColor')} />
        <Cell px={3} py={2} text="19" color={getColor('contrastColor')} />
    </svg>
)

export default Logo
