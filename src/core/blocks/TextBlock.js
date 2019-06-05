import React from 'react'
import ReactMarkdown from 'react-markdown/with-html'

const TextBlock = ({ className, text, title, children }) => {
    const cssClass = `block block--text ${className}`
    if (children) {
        return <div className={cssClass}>{children}</div>
    } else {
        return (
            <div className={cssClass}>
                {title && <h3 className="Block__Title block__title">{title}</h3>}
                {text && (
                    <div className="block__content">
                        <ReactMarkdown source={text} escapeHtml={false} />
                    </div>
                )}
            </div>
        )
    }
}

export default TextBlock
