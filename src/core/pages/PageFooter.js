import React from 'react'
import isEmpty from 'lodash/isEmpty'
import styled from 'styled-components'
import mq from 'core/theme/mq'
import { usePageContext } from 'core/helpers/pageContext'
import { useI18n } from 'core/i18n/i18nContext'
import Link from 'core/components/LocaleLink'
import PageLabel from './PageLabel'

const Container = styled.div`
    @media ${mq.small} {
        margin-top: ${props => props.theme.spacing * 4}px;
    }
    @media ${mq.mediumLarge} {
        margin-top: ${props => props.theme.spacing * 6}px;
    }
`

const Nav = styled.div`
    @media ${mq.mediumLarge} {
        display: flex;
        align-items: center;
        justify-content: center;
    }
`

const Notes = styled.div`
    font-size: ${props => props.theme.typography.sizes.smaller};
    text-align: center;
    
    @media ${mq.small} {
        margin-top: ${props => props.theme.spacing * 4}px;
    }
    @media ${mq.mediumLarge} {
        margin-top: ${props => props.theme.spacing * 6}px;
    }
`

const PageFooter = () => {
    const context = usePageContext()
    const { translate } = useI18n()

    return (
        <Container className="PageFooter">
            <Nav className="PageFooter__Nav">
                {context.previous && !isEmpty(context.previous) && (
                    <Link
                        className="PageFooter__Link PageFooter__Link--previous"
                        to={`${context.localePath}${context.previous.path}`}
                    >
                        « {translate('general.previous')} <PageLabel page={context.previous} />
                    </Link>
                )}
                {context.next && !isEmpty(context.next) && (
                    <Link
                        className="PageFooter__Link PageFooter__Link--next Button"
                        to={`${context.localePath}${context.next.path}`}
                    >
                        {translate('general.next')} <PageLabel page={context.next} /> »
                    </Link>
                )}
            </Nav>
            <Notes>
                <span
                    dangerouslySetInnerHTML={{
                        __html: translate('footer.state_of_js_link', {
                            values: { link: 'http://stateofjs.com/' }
                        })
                    }}
                />{' '}
                <span
                    dangerouslySetInnerHTML={{
                        __html: translate('footer.leave_an_issue', {
                            values: { link: 'https://github.com/StateOfJS/State-of-JS-2019/issues' }
                        })
                    }}
                />{' '}
                <span
                    dangerouslySetInnerHTML={{
                        __html: translate('footer.netlify', {
                            values: { link: 'https://www.netlify.com' }
                        })
                    }}
                />
            </Notes>
        </Container>
    )
}

export default PageFooter
