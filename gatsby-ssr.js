import React from 'react'
import Layout from './src/core/Layout'

export const wrapRootElement = ({ element }) => {
    return (
        <Layout>
            {element}
        </Layout>
    )
}