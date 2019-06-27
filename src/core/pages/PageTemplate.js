import React from 'react'
import TextBlock from 'core/blocks/TextBlock'
import PageHeader from 'core/pages/PageHeader'
import PageFooter from 'core/pages/PageFooter'
import { usePageContext } from 'core/helpers/pageContext'
import BlockSwitcher from 'core/components/BlockSwitcher'

const PageTemplate = props => {
    const { data = {} } = props
    const context = usePageContext()

    return (
        <>
            <PageHeader />
            {data.introduction && <TextBlock text={data.introduction.html} />}
            {context.blocks &&
                context.blocks.map((block, i) => (
                    <BlockSwitcher key={block.id} block={block} data={data} index={i} />
                ))}
            <PageFooter />
        </>
    )
}

export default PageTemplate
