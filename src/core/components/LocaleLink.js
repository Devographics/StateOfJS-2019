import { useRouter } from 'next/router'
import Link from 'next/link'

const LocaleLink = ({ to, children }) => {
    const router = useRouter()
    const lang = router.query.lang || 'en'

    return (
        <Link href={router.pathname} as="/">
            {children}
        </Link>
    )
}

export default LocaleLink
