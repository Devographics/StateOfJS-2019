import React from 'react'

const Logo = ({ className, animated = true, showText = true, size = 'l' }) => (
    <div className={`Logo__Container Logo--${size} ${className || ''}`}>
        <div className={`Logo ${animated ? 'Logo--animated' : ''}`}>
            <SVGFilter />
            {/* <svg viewBox="0 0 56 18">
            <text className="letter c" x="0" y="15">C</text>
            <text className="letter s1" x="0" y="15">S</text>
            <text className="letter s2" x="0" y="15">S</text>
        </svg> */}
            <div className="triangle">
                <div className="inner" />
            </div>
            <div className="blobs">
                <div className="blob blob1" />
                <div className="blob blob2" />
            </div>
            {size !== 's' && (
                <>
                    <div className="stripe stripe1" />
                    <div className="stripe stripe2" />
                    <div className="stripe stripe3" />
                    <div className="stripe stripe4" />
                </>
            )}
            <div className="circle">
                <div className="inner">
                    <div />
                </div>
            </div>

            <div className="frame">
                <div className="inner">
                    <div />
                </div>
            </div>
            {size !== 's' && (
                <>
                    <div className="tilde tilde1">~</div>
                    <div className="tilde tilde2">~</div>
                    <div className="tilde tilde3">~</div>
                </>
            )}
            {showText && <div className="text stateof">State Of</div>}
            <div className="letter c">
                <div>C</div>
            </div>
            <div className="letter s1">
                <div>S</div>
            </div>
            <div className="letter s2">
                <div>S</div>
            </div>
            {showText && <div className="text year">2019</div>}
        </div>
    </div>
)

const SVGFilter = () => (
    <svg xmlns="http://www.w3.org/2000/svg">
        {/* see https://css-tricks.com/gooey-effect/ */}
        <defs>
            <filter id="blob">
                <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                <feColorMatrix
                    in="blur"
                    values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7"
                    result="goo"
                />
                <feBlend in="SourceGraphic" in2="goo" />
            </filter>
        </defs>
    </svg>
)

export default Logo
