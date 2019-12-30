import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ReactGA from 'react-ga'
import { useI18n } from '../i18n/i18nContext'
import { getBlockMeta } from 'core/helpers/blockHelpers'
import { usePageContext } from '../helpers/pageContext'
import ShareTwitter from './ShareTwitter'
import ShareLinkedIn from './ShareLinkedIn'
import ShareFacebook from './ShareFacebook'
import ShareEmail from './ShareEmail'
import ShareImage from './ShareImage'

const ShareIcon = () => (
    <svg
        className="Share__Icon"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
    >
        <g
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            id="New_icons_1_"
            strokeWidth={2}
        >
            <line x1="11.5" y1="13.5" x2="11.5" y2="0.5" />
            <polyline points="7,5 11.5,0.5 16,5" />
            <polyline points="14.5,8.5 19.5,8.5 19.5,23.5 3.5,23.5 3.5,8.5 8.5,8.5" />
        </g>
    </svg>
)

const ShareBlock = ({ block, section, className, toggleClass, title }) => {
    const [showOptions, setShowOptions] = useState(false)
    const context = usePageContext()
    const { translate } = useI18n()

    const toggleOptions = e => {
        e.preventDefault()
        // toggle parent component's class
        toggleClass && toggleClass()
        setShowOptions(!showOptions)
        ReactGA.event({
            category: 'Clicks',
            action: `${section} chart toggle`
        })
    }

    const meta = getBlockMeta(block, context, translate, title)

    return (
        <div
            className={classNames(className, 'share-wrapper', {
                'share-popup-visible': showOptions
            })}
        >
            <div className="share">
                <div
                    className="share-button button"
                    onClick={e => {
                        toggleOptions(e)
                    }}
                >
                    <span className="desktop">{translate('share.share')}</span>
                    <span className="mobile">
                        <ShareIcon />
                    </span>
                </div>
            </div>
            <div className="share-popup">
                <div className="share-options">
                    <ShareTwitter text={meta.twitterText} trackingId={meta.trackingId} />
                    <ShareFacebook link={meta.link} trackingId={meta.trackingId} />
                    <ShareLinkedIn
                        link={meta.link}
                        title={meta.title}
                        trackingId={meta.trackingId}
                    />
                    <ShareEmail
                        subject={meta.emailSubject}
                        body={meta.emailBody}
                        trackingId={meta.trackingId}
                    />
                    <ShareImage trackingId={meta.trackingId} url={meta.imageUrl} />
                </div>
            </div>
        </div>
    )
}

ShareBlock.propTypes = {
    block: PropTypes.shape({
        id: PropTypes.string.isRequired
    }).isRequired
}

export default ShareBlock
