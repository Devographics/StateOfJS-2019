import React from 'react'
import PropTypes from 'prop-types'
import { getColor } from '../../../../constants'

const AgreeIcon = ({ size }) => (
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
            d="M35 65C38 68 41.7157 71 50 71C58.2843 71 62 68 65 65"
            stroke={getColor('activeColor')}
            strokeWidth="4"
            strokeLinecap="round"
        />
    </svg>
)

AgreeIcon.propTypes = {
    size: PropTypes.number.isRequired
}

export default AgreeIcon
