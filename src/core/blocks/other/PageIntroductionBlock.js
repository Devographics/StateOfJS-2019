import React from 'react'

const PageIntroductionBlock = ({ block, data }) => (
    <div dangerouslySetInnerHTML={{ __html: data }} />
)

export default PageIntroductionBlock
