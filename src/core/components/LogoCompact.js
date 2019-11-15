import React from 'react'
import { getColor } from '../../constants.js'
import Cell from './LogoCell.js'

const Logo = ({ width = '100%' }) => (
    <svg width={width} viewBox="0 0 390 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(-2, 0)">
            <Cell px={0} text="St" color={getColor('textColor')} />
            <Cell px={1} text="Js" color={getColor('activeColor')} />
            <Cell px={2} text="20" color={getColor('contrastColor')} />
            <Cell px={3} text="19" color={getColor('contrastColor')} />
        </g>
    </svg>
)
export default Logo
