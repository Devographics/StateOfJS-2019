import React from 'react'
import PropTypes from 'prop-types'
import { getColor } from 'core/constants.js'

const NeutralIcon = ({ size }) => (
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
            d="M65 65.25H50H35"
            stroke={getColor('activeColor')}
            strokeWidth="4"
            strokeLinecap="round"
        />
    </svg>
)

NeutralIcon.propTypes = {
    size: PropTypes.number.isRequired
}

export default NeutralIcon
