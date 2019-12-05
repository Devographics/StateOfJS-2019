import React from 'react'
import PropTypes from 'prop-types'
import { getColor } from '../../../../constants'

const StronglyAgreeIcon = ({ size }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <circle cx="50.5" cy="50.5" r="41.5" stroke={getColor('activeColor')} strokeWidth="4" />
        <path
            d="M35 65C38 68 41.7157 71 50 71C58.2843 71 62 68 65 65"
            stroke={getColor('activeColor')}
            strokeWidth="4"
            strokeLinecap="round"
        />
        <path
            d="M41 43C40.25 40.1429 37.8995 38 35 38C32.1005 38 29.75 40.1429 29 43"
            stroke={getColor('activeColor')}
            strokeWidth="4"
            strokeLinecap="round"
        />
        <path
            d="M70 43C69.25 40.1429 66.8995 38 64 38C61.1005 38 58.75 40.1429 58 43"
            stroke={getColor('activeColor')}
            strokeWidth="4"
            strokeLinecap="round"
        />
    </svg>
)

StronglyAgreeIcon.propTypes = {
    size: PropTypes.number.isRequired
}

export default StronglyAgreeIcon
