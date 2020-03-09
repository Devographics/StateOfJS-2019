import { useRouter } from 'next/router'
import locales from '../../config/locales.yml'

export { locales }

export function useLang() {
    const { query } = useRouter()
    return query.lang === 'en' ? 'default' : query.lang
}

export function useLocale() {
    const lang = useLang()
    return locales.find(locale => locale.path === lang)
}
