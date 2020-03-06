import Link from 'next/link'
import styled from 'styled-components'
import mq from 'core/theme/mq'
import locales from '../../../config/locales.yml'
import { usePageContext } from 'core/helpers/pageContext'

const Container = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    grid-column-gap: ${props => props.theme.spacing}px;
    grid-row-gap: ${props => props.theme.spacing}px;
`

const Item = styled(Link)`
    text-align: center;
    font-size: ${props => props.theme.typography.sizes.medium};

    @media ${mq.smallMedium} {
        font-size: ${props => props.theme.typography.sizes.small};
    }
    @media ${mq.large} {
        font-size: ${props => props.theme.typography.sizes.medium};
    }

    &._is-current {
        font-weight: ${props => props.theme.typography.weights.bold};
    }
}
`

const Locales = () => {
    const context = usePageContext()

    return (
        <Container className="Locales">
            {locales.map(locale => {
                const asPath = `${locale.path === 'default' ? '/' : `/${locale.path}`}${
                    context.basePath
                }`
                const isCurrent = locale.locale === context.locale

                return (
                    <Link key={locale} href="/[lang]" as={asPath}>
                        <Item className={`Locales__Item${isCurrent ? ' _is-current' : ''}`}>
                            {locale.label}
                        </Item>
                    </Link>
                )
            })}
        </Container>
    )
}

export default Locales
