import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import sponsors from 'data/sponsors.yaml'
import { useI18n } from 'core/i18n/i18nContext'

const SponsorsBlock = () => {
    const { translate } = useI18n()

    return (
        <div className="Sponsors__Wrapper">
            <div className="Sponsors">
                <h3 className="Sponsors__Heading">{translate('partners.our_partners')}:</h3>
                <div className="Sponsors__Items">
                    {sponsors.map(({ name, image, url }) => (
                        <div className="Sponsors__Item" key={name}>
                            <a href={url} title={name}>
                                <img src={`/images/sponsors/${image}`} alt={name} />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
            <div className="Sponsors__Support">
                <Link to="/support">{translate('partners.become_partner')}</Link>
            </div>
        </div>
    )
}

SponsorsBlock.propTypes = {
    section: PropTypes.string
}

export default SponsorsBlock
