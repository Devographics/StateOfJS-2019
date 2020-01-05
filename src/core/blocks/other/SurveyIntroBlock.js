import React from 'react'
import TextBlock from 'core/blocks/other/TextBlock'
import SponsorsBlock from 'core/blocks/other/SponsorsBlock'
import NewsletterBlock from 'core/blocks/other/NewsletterBlock'
import IntroductionFooter from 'core/pages/IntroductionFooter'

const SurveyIntroBlock = ({ data }) => (
    <div className="SurveyIntro">
        <div className="SurveyIntro__Content">
            <div className="main-logo-wrapper">
                <img
                    className="logo-image"
                    src="/images/stateofjs-logo.svg"
                    alt="State of JavaScript 2019 Logo"
                />
            </div>
            <TextBlock text={data} />
            <IntroductionFooter />
        </div>
        <NewsletterBlock />
        <SponsorsBlock />
    </div>
)

export default SurveyIntroBlock
