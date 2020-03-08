import { useRouter } from 'next/router'
import Link from 'next/link'

const LocaleLink = ({ to, children }) => {
    const router = useRouter()
    const lang = router.query.lang || 'en'
    const href = `/[lang]${to}${lang === 'en' ? '?lang=en' : ''}`
    const as = lang === 'en' ? to : `/${lang}${to}`

    return (
        <Link href={href} as={as} passHref>
            {children}
        </Link>
    )
}

export default LocaleLink
