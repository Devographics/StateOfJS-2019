import React from 'react'

const PageIntroductionBlock = ({ data }) => (
    <div className="Page__Introduction" dangerouslySetInnerHTML={{ __html: data }} />
)

export default PageIntroductionBlock
