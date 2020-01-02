import React from 'react'
import TextBlock from 'core/blocks/other/TextBlock'
import LogoMain from 'core/components/LogoMain'
import SponsorsBlock from 'core/blocks/other/SponsorsBlock'
import NewsletterBlock from 'core/blocks/other/NewsletterBlock'
import IntroductionFooter from 'core/pages/IntroductionFooter'

const SurveyIntroBlock = ({ data, block }) => (
    <div className="SurveyIntro">
        <div className="SurveyIntro__Content">
            <div className="main-logo-wrapper">
                {/* <img
                    className="logo-image"
                    src="/images/stateofjs-logo.svg"
                    alt="State of JavaScript 2019 Logo"
                /> */}
                <LogoMain/>
            </div>
            <TextBlock text={data} />
            <IntroductionFooter />
        </div>
        <NewsletterBlock />
        <SponsorsBlock />
    </div>
)

export default SurveyIntroBlock
