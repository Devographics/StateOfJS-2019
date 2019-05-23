import React from 'react'

const TextBlock = ({ text, title, children }) => {
    if (children) {
        return <div className="block block--text">{children}</div>
    } else {
        return (
            <div className="block block--text">
                {title && <h3 className="Block__Title block__title">{title}</h3>}
                {text && (
                    <div className="block__content" dangerouslySetInnerHTML={{ __html: text }} />
                )}
            </div>
        )
    }
}

export default TextBlock
