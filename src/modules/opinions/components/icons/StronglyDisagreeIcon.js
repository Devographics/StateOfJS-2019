import React from 'react'
import PropTypes from 'prop-types'
import { getColor } from 'core/constants.js'

const StronglyDisagreeIcon = ({ size }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <circle cx="50.5" cy="50.5" r="41.5" stroke={getColor('activeColor')} strokeWidth="4" />
        <circle cx="35.5" cy="45.5" r="3.5" fill={getColor('activeColor')} />
        <circle cx="64.5" cy="45.5" r="3.5" fill={getColor('activeColor')} />
        <path
            d="M64 75C61.2 72 57.732 69 50 69C42.268 69 38.8 72 36 75"
            stroke={getColor('activeColor')}
            strokeWidth="4"
            strokeLinecap="round"
        />
        <path
            d="M28 32L41 36"
            stroke={getColor('activeColor')}
            strokeWidth="4"
            strokeLinecap="round"
        />
        <path
            d="M73 32L59 36"
            stroke={getColor('activeColor')}
            strokeWidth="4"
            strokeLinecap="round"
        />
    </svg>
)

StronglyDisagreeIcon.propTypes = {
    size: PropTypes.number.isRequired
}

export default StronglyDisagreeIcon
