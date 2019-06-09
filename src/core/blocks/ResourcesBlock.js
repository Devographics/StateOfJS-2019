import React from 'react'
import PropTypes from 'prop-types'
import ReactGA from 'react-ga'
import { Link } from 'gatsby'
import resources from 'data/sponsoredlinks.yaml'
import BlockTitle from 'core/components/BlockTitle'
import { useI18n } from '../i18n/i18nContext'

const trackClick = (id, resource, label) => {
    ReactGA.event({
        category: 'Sponsor Clicks',
        action: `${id}: ${resource.name}`,
        label
    })
}

const ResourcesBlock = ({ block }) => {
    const { translate } = useI18n()
    const { id } = block
    const sectionResources = resources.filter(r => block.items.includes(r.id))

    if (!sectionResources.length) {
        return null
    }

    return (
        <div className="block block--resources">
            <div className="resources">
                <BlockTitle
                    id="recommended_resources"
                    showDescription={false}
                    isShareable={false}
                />
                <div className="resources-list">
                    {sectionResources.map(resource => {
                        const url = resource.url.includes('utm_source')
                            ? resource.url
                            : `${
                                  resource.url
                              }?utm_source=stateofjs&utm_medium=sponsor&utm_campaign=${id}`

                        return (
                            <div key={resource.name} className="resource">
                                <div className="resource-image">
                                    <div>
                                        {/* eslint-disable-next-line */}
                                        <a
                                            onClick={() => trackClick(id, resource, 'text')}
                                            href={`${url}&utm_content=textlink`}
                                            style={{
                                                backgroundImage: `url(/images/resources/${
                                                    resource.image
                                                })`
                                            }}
                                            title={resource.name}
                                        />
                                    </div>
                                </div>
                                <div className="resource-contents">
                                    <h4 className="resource-title">
                                        <a
                                            onClick={() => trackClick(id, resource, 'text')}
                                            href={`${url}&utm_content=textlink`}
                                        >
                                            {resource.name}
                                        </a>
                                    </h4>
                                    {/*
                                    <h5 className="resource-author">{resource.author}</h5>
                                    */}
                                    <div className="resource-description">
                                        {resource.description}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="resources-sponsored">
                    <span>{translate('partners.thanks')}</span>
                    {' '}
                    <Link to="/support">{translate('partners.learn_more')}</Link>
                </div>
            </div>
        </div>
    )
}

ResourcesBlock.propTypes = {
    section: PropTypes.string
}

export default ResourcesBlock
