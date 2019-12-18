import React from 'react'
import NewsletterBlock from 'core/blocks/other/NewsletterBlock'

const ConclusionBlock = ({ block, data }) => (
    <div className="Conclusion">
        <div dangerouslySetInnerHTML={{ __html: data }} />
        <NewsletterBlock />
    </div>
)

export default ConclusionBlock
