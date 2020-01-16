import React from 'react'
import Layout from './src/core/Layout'

export const wrapPageElement = ({ element, props }) => {
    const { pageContext, ...rest } = props

    return (
        <Layout {...rest} pageContext={pageContext}>
            {element}
        </Layout>
    )
}
