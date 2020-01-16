import React from 'react'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown/with-html'

const Content = styled.div`
    li {
        margin-bottom: ${props => props.theme.spacing / 2}px;
    }
`

const TextBlock = ({ className, text, title, children }) => {
    const cssClass = `block block--text ${className}`
    if (children) {
        return <div className={cssClass}>{children}</div>
    } else {
        return (
            <div className={cssClass}>
                {title && <h3 className="Block__Title block__title">{title}</h3>}
                {text && (
                    <Content className="block__content">
                        <ReactMarkdown source={text} escapeHtml={false} />
                    </Content>
                )}
            </div>
        )
    }
}

export default TextBlock
