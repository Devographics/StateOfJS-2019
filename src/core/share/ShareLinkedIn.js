import React from 'react'
import PropTypes from 'prop-types'
import { useI18n } from 'core/i18n/i18nContext'
import track from './tracking'
import ShareLink from './ShareLink'

const ShareLinkedIn = ({ link, title, summary = '', trackingId }) => {
    const { translate } = useI18n()

    return (
        <ShareLink
            onClick={track('LinkedIn', trackingId)}
            media="linkedin"
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                link
            )}&title=${title}&summary=${summary}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={translate('share.linkedin')}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                aria-hidden="true"
            >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
            <span className="sr-only">{translate('share.linkedin')}</span>
        </ShareLink>
    )
}

ShareLinkedIn.propTypes = {
    link: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string,
    trackingId: PropTypes.string
}

export default ShareLinkedIn
