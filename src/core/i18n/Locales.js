import React from 'react'
import styled from 'styled-components'
import mq from 'core/theme/mq'
import Link from 'core/components/LocaleLink'
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
    const links = locales.map(locale => {
        return {
            ...locale,
            link: `${locale.path === 'default' ? '' : `/${locale.path}`}${context.basePath}`,
            isCurrent: locale.locale === context.locale
        }
    })

    return (
        <Container className="Locales">
            {links.map(({ label, locale, link, isCurrent }) => (
                <Item
                    key={locale}
                    className={`Locales__Item${isCurrent ? ' _is-current' : ''}`}
                    to={link}
                >
                    {label}
                </Item>
            ))}
        </Container>
    )
}

export default Locales
