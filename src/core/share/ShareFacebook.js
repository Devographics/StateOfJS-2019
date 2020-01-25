import React from 'react'
import PropTypes from 'prop-types'
import { useI18n } from 'core/i18n/i18nContext'
import track from './tracking'
import ShareLink from './ShareLink'

const ShareFacebook = ({ link, trackingId }) => {
    const { translate } = useI18n()

    return (
        <ShareLink
            onClick={track('Facebook', trackingId)}
            media="facebook"
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={translate('share.facebook')}
        >
            <svg
                version="1.1"
                x="0px"
                y="0px"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                enableBackground="new 0 0 24 24"
                xmlSpace="preserve"
                aria-hidden="true"
            >
                <path d="M18.768,7.465H14.5V5.56c0-0.896,0.594-1.105,1.012-1.105s2.988,0,2.988,0V0.513L14.171,0.5C10.244,0.5,9.5,3.438,9.5,5.32 v2.145h-3v4h3c0,5.212,0,12,0,12h5c0,0,0-6.85,0-12h3.851L18.768,7.465z" />
            </svg>
            <span className="sr-only">{translate('share.facebook')}</span>
        </ShareLink>
    )
}

ShareFacebook.propTypes = {
    link: PropTypes.string.isRequired,
    trackingId: PropTypes.string
}

export default ShareFacebook
