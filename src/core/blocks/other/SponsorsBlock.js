import React from 'react'
import styled from 'styled-components'
import Link from 'core/components/LocaleLink'
import sponsors from 'data/sponsors.yml'
import { useI18n } from 'core/i18n/i18nContext'

const SponsorsBlock = () => {
    const { translate } = useI18n()

    return (
        <>
            <Container>
                <Header>{translate('partners.our_partners')}:</Header>
                <div className="Sponsors__Items">
                    {sponsors.map(({ name, image, url, id }) => (
                        <div className={`Sponsors__Item Sponsors__Item--${id}`} key={name}>
                            <a href={url} title={name}>
                                <img src={`/images/sponsors/${image}`} alt={name} />
                            </a>
                        </div>
                    ))}
                </div>
            </Container>
            <Support className="Sponsors__Support">
                <Link to="/support">{translate('partners.become_partner')}</Link>
            </Support>
        </>
    )
}

const Container = styled.div`
    background: ${props => props.theme.colors.backgroundAlt};
    padding: ${props => props.theme.spacing * 1.5}px;
    margin-top: ${props => props.theme.spacing * 2}px;
`

const Header = styled.h3`
    text-align: center;
    margin-bottom: ${props => props.theme.spacing}px;
`

const Support = styled.div`
    text-align: center;
    margin-top: ${props => props.theme.spacing / 2}px;
`

export default SponsorsBlock
