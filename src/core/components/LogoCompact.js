import React from 'react'
import { getColor } from 'core/constants.js'
import Cell from './LogoCell.js'

const Logo = ({ width = '100%' }) => (
    <svg width={width} viewBox="0 0 390 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(-2, 0)">
            <Cell px={0} text="St" color={getColor('textColor')} />
            <Cell px={1} text="Js" color={getColor('textColor')} />
            <Cell px={2} text="Fe" color={getColor('femaleNonBinary')} />
            <Cell px={3} text="Nb" color={getColor('femaleNonBinary')} />
        </g>
    </svg>
)
export default Logo
