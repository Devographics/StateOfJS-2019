import React from 'react'
import TextBlock from 'core/blocks/TextBlock'
import PageHeader from 'core/pages/PageHeader'
import PageFooter from 'core/pages/PageFooter'
import { usePageContext } from 'core/helpers/pageContext'
import BlockSwitcher from 'core/components/BlockSwitcher'

const PageTemplate = ({ data = {}, pageContext = {} }) => {
    const context = usePageContext()
    const { pageData } = pageContext
    return (
        <>
            <PageHeader />
            <div className="page-query">
                <textarea>{pageContext.pageQuery}</textarea>
            </div>
            {data.introduction && <TextBlock text={data.introduction.html} />}
            {context.blocks &&
                context.blocks.map((block, i) => (
                    <BlockSwitcher key={block.id} block={block} pageData={pageData} index={i} />
                ))}
            <PageFooter />
        </>
    )
}

export default PageTemplate
