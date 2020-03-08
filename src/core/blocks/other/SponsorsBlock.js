import React from 'react'
import styled from 'styled-components'
import LocaleLink from 'core/components/LocaleLink'
import sponsors from 'data/sponsors.yml'
import { useI18n } from 'core/i18n/i18nContext'
import mq from 'core/theme/mq'

const SponsorsBlock = () => {
    const { translate } = useI18n()

    return (
        <>
            <Container>
                <Header>{translate('partners.our_partners')}:</Header>
                <SponsorList className="Sponsor__list">
                    {sponsors.map(({ name, image, url, id }) => (
                        <Sponsor className={`Sponsor Sponsor--${id}`} key={name}>
                            <a href={url} title={name}>
                                <img src={`/images/sponsors/${image}`} alt={name} />
                            </a>
                        </Sponsor>
                    ))}
                </SponsorList>
            </Container>
            <Support className="Sponsors__Support">
                <LocaleLink to="/support">
                    <a>{translate('partners.become_partner')}</a>
                </LocaleLink>
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

const SponsorList = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    @media ${mq.smallMedium} {
        flex-direction: column;
    }
`

const Sponsor = styled.div`
    width: 150px;

    @media ${mq.smallMedium} {
        margin-bottom: ${({ theme }) => theme.spacing}px;
    }

    @media ${mq.large} {
        margin-right: ${({ theme }) => theme.spacing * 3}px;
    }

    &:last-child {
        margin: 0;
    }

    a,
    svg,
    img {
        display: block;
        width: 100%;
    }
    &--designcode {
        width: 50px;
    }
`

const Support = styled.div`
    text-align: center;
    margin-top: ${({ theme }) => theme.spacing / 2}px;
    font-size: ${({ theme }) => theme.typography.sizes.smallish};
`

export default SponsorsBlock
