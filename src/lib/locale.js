import locales from '../../config/locales.yml'

export function getLocalePaths() {
    return locales.map(({ path }) => (path === 'default' ? '/en' : `/${path}`))
}

export function getLocaleByPath(path) {
    return locales.find(locale => locale.path === path)
}
