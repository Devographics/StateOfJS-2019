import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ReactGA from 'react-ga'
import { useLocale } from 'lib/locale'
import Link from 'core/components/LocaleLink'
import resources from 'data/recommended_resources.yml'
import BlockTitle from 'core/blocks/block/BlockTitle'
import { useI18n } from 'core/i18n/i18nContext'
import { usePageContext } from 'core/helpers/pageContext'
import mq from 'core/theme/mq'

const trackClick = (id, resource, label) => {
    ReactGA.event({
        category: 'Sponsor Clicks',
        action: `${id}: ${resource.name}`,
        label
    })
}

const RecommendedResourcesBlock = ({ block, data }) => {
    const { translate } = useI18n()
    const context = usePageContext()
    const { locale } = useLocale()
    const { sponsors: pageSponsors } = context
    const { sponsors: blockSponsors } = block

    // only show recommended resources on english version
    if (locale !== 'en-US') {
        return null
    }

    // sponsors can be defined either at the page level or block level
    const sponsors = pageSponsors || blockSponsors

    if (!sponsors) {
        return null
    }
    const { id } = block
    const sectionResources = resources.filter(r => sponsors.includes(r.id))

    if (!sectionResources.length) {
        return null
    }

    return (
        <div className="Block">
            <div className="resources">
                <BlockTitle block={{ ...block, showDescription: false }} isShareable={false} />
                <List className="Resources__list">
                    {sectionResources.map(resource => {
                        const url = resource.url.includes('utm_source')
                            ? resource.url
                            : `${resource.url}?utm_source=stateofjs&utm_medium=sponsor&utm_campaign=${id}`

                        return (
                            <Resource key={resource.name} className="Resource">
                                <ResourceImage className="Resource__image">
                                    <div>
                                        <a
                                            onClick={() => trackClick(id, resource, 'text')}
                                            href={`${url}&utm_content=textlink`}
                                            style={{
                                                backgroundImage: `url(${resource.image})`
                                            }}
                                            title={resource.name}
                                        >
                                            {resource.name}
                                        </a>
                                    </div>
                                </ResourceImage>
                                <ResourceContent className="Resource__content">
                                    <Title className="Resource__title">
                                        <a
                                            onClick={() => trackClick(id, resource, 'text')}
                                            href={`${url}&utm_content=textlink`}
                                        >
                                            {resource.name}
                                        </a>
                                    </Title>
                                    <Description className="Resource__description">
                                        {resource.description}
                                    </Description>
                                </ResourceContent>
                            </Resource>
                        )
                    })}
                </List>
                <Sponsoring className="Resources__sponsoring">
                    <span>{translate('partners.thanks')}</span>{' '}
                    <Link to="/support">{translate('partners.learn_more')}</Link>
                </Sponsoring>
            </div>
        </div>
    )
}

RecommendedResourcesBlock.propTypes = {
    section: PropTypes.string
}

const List = styled.div`
    @media ${mq.large} {
        display: grid;
        grid-template-columns: auto auto;
        grid-gap: ${({ theme }) => theme.spacing * 2}px;
    }
`

const Title = styled.h4`
    margin-bottom: 0;
`

const Description = styled.div`
    font-size: ${({ theme }) => theme.typography.sizes.smallish};
`

const Resource = styled.div`
    margin-bottom: ${({ theme }) => theme.spacing}px;

    @media ${mq.mediumLarge} {
        display: flex;
    }
`

const ResourceImage = styled.div`
    @media ${mq.small} {
        width: 60px;
        float: right;
        margin: 0 0 ${({ theme }) => theme.spacing}px ${({ theme }) => theme.spacing}px;
    }

    @media ${mq.mediumLarge} {
        width: 160px;
        margin-right: ${({ theme }) => theme.spacing}px;
    }

    div {
        background: ${({ theme }) => theme.colors.text};
        position: relative;
        z-index: 10;
        border: 2px solid ${({ theme }) => theme.colors.text};
    }

    a {
        display: block;
        width: 100%;
        padding-bottom: 90%;
        height: 0;
        background-position: center center;
        background-size: cover;
        line-height: 0;
        font-size: 0;
        color: transparent;
    }

    img,
    svg {
        display: block;
        width: 100%;
        border: 3px solid white;
    }
`

const ResourceContent = styled.div`
    flex: 1;
`

const Sponsoring = styled.div`
    font-weight: ${({ theme }) => theme.typography.weights.bold};
    font-size: ${({ theme }) => theme.typography.sizes.smaller};
    text-align: center;
`

export default RecommendedResourcesBlock
