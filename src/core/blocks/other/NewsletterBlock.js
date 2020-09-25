import React from 'react'
import styled from 'styled-components'
import Newsletter from 'core/components/Newsletter'
import { useI18n } from 'core/i18n/i18nContext'

const Container = styled.div`
    // @include border2;
    padding: ${props => props.theme.spacing * 1.5}px;
    margin-bottom: ${props => props.theme.spacing * 2}px;
    border: ${props => props.theme.separationBorder};
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
`

const NewsletterBlock = () => {
    const { translate } = useI18n()

    return (
        <Container className="Block Block--Newsletter Newsletter">
            <h3 className="Newsletter__Heading">{translate('general.stay_tuned')}</h3>
            <div className="Newsletter__Description">{translate('general.leave_your_email')}</div>
            <Newsletter />
        </Container>
    )
}

export default NewsletterBlock
