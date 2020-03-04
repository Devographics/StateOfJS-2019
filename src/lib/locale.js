import locales from '../../config/locales.yml'

export function getLocaleByPath(path) {
    return locales.find(locale => locale.path === path)
}
