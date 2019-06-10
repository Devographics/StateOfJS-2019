import React, { memo } from 'react'
import PropTypes from 'prop-types'

const Indicator = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="100"
        viewBox="0 0 30 100"
        className="Indicator"
    >
        <g id="Outline_Icons">
            <line
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                strokeWidth="8"
                x1="30"
                y1="0"
                x2="0"
                y2="50"
            />
            <line
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                strokeWidth="8"
                x1="0"
                y1="50"
                x2="30"
                y2="100"
            />
        </g>
    </svg>
)
const IndicatorLeft = memo(() => (
    <span className="Chart__Container__Indicator Chart__Container__Indicator--left">
        <Indicator />
    </span>
))
const IndicatorRight = memo(() => (
    <span className="Chart__Container__Indicator Chart__Container__Indicator--right">
        <Indicator />
    </span>
))
const IndicatorTop = memo(() => (
    <span className="Chart__Container__Indicator Chart__Container__Indicator--top">
        <Indicator />
    </span>
))
const IndicatorBottom = memo(() => (
    <span className="Chart__Container__Indicator Chart__Container__Indicator--bottom">
        <Indicator />
    </span>
))

/*

- Fit: fit to viewport width
- Expand: force a 600px width

*/

const ChartContainer = ({ children, height, fit = false, className = '', vscroll = false }) => (
    <div
        className={`Chart__Container__Outer Chart__Container__Outer--${
            fit ? 'fit' : 'expand'
        } ${className}`}
    >
        <div className="Chart__Container">
            <div className="Chart__Container__Inner" style={{ height }}>
                {children}
            </div>
        </div>
        {!fit && (
            <>
                <IndicatorLeft />
                <IndicatorRight />
                {vscroll && (
                    <>
                        <IndicatorTop />
                        <IndicatorBottom />
                    </>
                )}
            </>
        )}
    </div>
)

ChartContainer.propTypes = {
    height: PropTypes.number,
    fit: PropTypes.bool,
    className: PropTypes.string,
    vscroll: PropTypes.bool
}

export default ChartContainer
