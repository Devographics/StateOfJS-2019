import React from 'react'
import styled from 'styled-components'
import { usePageContext } from 'core/helpers/pageContext'
import { useI18n } from 'core/i18n/i18nContext'
import LocaleLink from 'core/components/LocaleLink'
import Button from 'core/components/Button'

const IntroductionFooter = () => {
    const context = usePageContext()
    const { translate } = useI18n()

    return (
        <Container className="IntroductionFooter">
            <LocaleLink to={context.next.path}>
                <Button as="a" size="large" className="IntroductionFooter__Link--start">
                    {translate('general.start')} »
                </Button>
            </LocaleLink>
        </Container>
    )
}

const Container = styled.div`
    margin: ${({ theme }) => theme.spacing * 2}px 0;
`

export default IntroductionFooter
