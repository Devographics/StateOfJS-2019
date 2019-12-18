import React from 'react'
import ReactMarkdown from 'react-markdown/with-html'
// import { useI18n } from 'core/i18n/i18nContext'

const BioBlock = ({ subheading, heading, photo, bio }) => {
    // const { translate } = useI18n()

    return (
        <div className="Bio">
            {subheading && <h3 className="Bio__Subheading">{subheading}</h3>}
            <div className="Bio__Contents">
                <div className="Bio__Photo">
                    <img src={photo} />
                </div>
                <div className="Bio__Bio">
                    <h3 className="Bio__Heading" dangerouslySetInnerHTML={{ __html: heading }} />
                    <ReactMarkdown source={bio} escapeHtml={false} />
                </div>
            </div>
        </div>
    )
}

export default BioBlock
