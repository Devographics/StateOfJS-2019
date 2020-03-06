import Layout from '../core/Layout'
import '../stylesheets/screen.scss'

export default function App({ Component, pageProps }) {
    // return <Component {...pageProps} />
    return (
        <Layout pageContext={pageProps}>
            <Component {...pageProps} />
        </Layout>
    )
}
