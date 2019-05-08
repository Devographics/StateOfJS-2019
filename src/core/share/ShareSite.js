import React from 'react'
import ShareTwitter from './ShareTwitter'
import ShareEmail from './ShareEmail'
import ShareFacebook from './ShareFacebook'
import ShareLinkedIn from './ShareLinkedIn'
import { usePageContext } from '../helpers/pageContext'
import { useI18n } from '../i18n/i18nContext'
import { GridLinesSVG } from '../components/Illustration'

const ShareSite = () => {
    const context = usePageContext()
    const { translate } = useI18n()

    const link = context.host
    const transOptions = {
        values: { link }
    }
    const title = translate('share.site.title', transOptions)
    const twitterText = translate('share.site.twitter_text', transOptions)
    const subject = translate('share.site.subject', transOptions)
    const body = translate('share.site.body', transOptions)

    return (
        <div className="ShareSite">
            <GridLinesSVG ratio="logo" />
            <div className="ShareSite__Content">
                <ShareTwitter text={twitterText} />
                <ShareFacebook link={link} />
                <ShareLinkedIn link={link} title={title} />
                <ShareEmail subject={subject} body={body} />
            </div>
        </div>
    )
}

export default ShareSite
