import React from 'react'
import styled from 'styled-components'
import { useI18n } from 'core/i18n/i18nContext'
import mq from 'core/theme/mq'
import { locales } from '../../../lib/locale'

const contributedLocales = locales.filter(({ locale }) => locale !== 'en-US')

const TranslatorsBlock = () => {
    const { translate } = useI18n()

    return (
        <>
            <Container>
                <Header>{translate('general.translation_help')}</Header>
                <Locales>
                    {contributedLocales.map(({ label, translators }) => (
                        <Locale key={label}>
                            <LocaleLabel>{label}</LocaleLabel>
                            <Translators>
                                {translators.map(({ name, github }) => (
                                    <Translator key={name}>
                                        <a href={github}>{name}</a>
                                    </Translator>
                                ))}
                            </Translators>
                        </Locale>
                    ))}
                </Locales>
            </Container>
        </>
    )
}

const Container = styled.div`
    margin-top: ${props => props.theme.spacing * 2}px;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
    border: ${props => props.theme.separationBorder};
    padding: ${props => props.theme.spacing * 2}px;
`

const Header = styled.h3`
    text-align: center;
    margin-bottom: ${props => props.theme.spacing}px;
`

const Locales = styled.div`
    display: grid;
    @media ${mq.smallMedium} {
        grid-template-columns: 1fr 1fr;
        column-gap: ${props => props.theme.spacing / 2}px;
        row-gap: ${props => props.theme.spacing / 2}px;
    }
    @media ${mq.large} {
        grid-template-columns: 1fr 1fr 1fr;
        column-gap: ${props => props.theme.spacing}px;
        row-gap: ${props => props.theme.spacing}px;
    }
`

const Locale = styled.div``

const LocaleLabel = styled.h4`
    margin-bottom: 0;
`

const Translators = styled.div``

const Translator = styled.span`
    &:after {
        content: ', ';
    }
    &:last-child:after {
        content: none;
    }
`
export default TranslatorsBlock
