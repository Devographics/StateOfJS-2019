import React from 'react'
import PropTypes from 'prop-types'
import { getColor } from 'core/constants.js'

const DisagreeIcon = ({ size }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <circle cx="50.5" cy="50.5" r="41.5" stroke={getColor('activeColor')} strokeWidth="4" />
        <circle cx="35.5" cy="40.5" r="3.5" fill={getColor('activeColor')} />
        <circle cx="64.5" cy="40.5" r="3.5" fill={getColor('activeColor')} />
        <path
            d="M65 68C62 65 58.2843 62 50 62C41.7157 62 38 65 35 68"
            stroke={getColor('activeColor')}
            strokeWidth="4"
            strokeLinecap="round"
        />
    </svg>
)

DisagreeIcon.propTypes = {
    size: PropTypes.number.isRequired
}

export default DisagreeIcon
