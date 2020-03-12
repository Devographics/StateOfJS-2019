import locales from '../../../config/locales.yml'

export function getLocaleStaticPaths() {
    return locales.map(({ path }) => ({
        params: { lang: path === 'default' ? 'en' : path }
    }))
}

export function getLocaleByPath(path) {
    return locales.find(locale => locale.path === path)
}
