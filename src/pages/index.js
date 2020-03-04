import yaml from 'js-yaml'
import getTranslationsByLocale from '../lib/translations'
import { getLocaleByPath } from '../lib/locale'
import { getPage, getPageContext, getPageQuery } from '../lib/_page'

export async function getStaticProps() {
    const page = await getPage('/')
    const context = getPageContext(page)
    // console.log('PAGE', page)
    // console.log('CONTEXT', getPageContext(page))
    const query = getPageQuery(page)
    console.log('QUERY', query)
    const locale = getLocaleByPath('default')
    const translations = getTranslationsByLocale(locale.locale)
    const props = {
        locale: locale.locale,
        localeLabel: locale.label,
        localePath: locale.path === 'default' ? '' : `/${locale.path}`,
        translations,

        id: 'introduction',
        showTitle: false,
        is_hidden: false,
        pageIndex: 0,
        defaultBlockType: 'default',
        next: {
            id: 'tshirt',
            showTitle: false,
            path: '/tshirt/',
            pageIndex: 1,
            defaultBlockType: 'default'
        },
        basePath: '/'
    }

    return { props }
}

export default function Index(props) {
    console.log('PROPS', props)
    return null
}
