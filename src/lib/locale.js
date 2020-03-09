import { useRouter } from 'next/router'
import locales from '../../config/locales.yml'

export { locales }

export function useLocale() {
    const router = useRouter()
    return locales.find(locale => locale.path === router.query.lang)
}
