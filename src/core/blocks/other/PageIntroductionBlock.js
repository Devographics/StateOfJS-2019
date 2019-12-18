import React from 'react'

const PageIntroductionBlock = ({ block, data }) => (
    <div className="Page__Introduction" dangerouslySetInnerHTML={{ __html: data }} />
)

export default PageIntroductionBlock
