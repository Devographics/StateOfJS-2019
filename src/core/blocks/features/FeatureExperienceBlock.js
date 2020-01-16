import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Block from 'core/blocks/block/Block'
import { useI18n } from 'core/i18n/i18nContext'
import ChartContainer from 'core/charts/ChartContainer'
import { featureExperience } from 'core/constants'
import GaugeBarChart from 'core/charts/generic/GaugeBarChart'
import { usePageContext } from 'core/helpers/pageContext'

// convert relative links into absolute MDN links
const parseMDNLinks = content =>
    content.replace(new RegExp(`href="/`, 'g'), `href="https://developer.mozilla.org/`)

const FeatureExperienceBlock = ({ block, data, units: defaultUnits = 'percentage' }) => {
    const [units, setUnits] = useState(defaultUnits)

    const context = usePageContext()
    const { locale } = context
    const { translate } = useI18n()
    const { name, mdn } = data

    // @todo: handle normalization directly in the survey
    const buckets = data.experience.year.buckets.map(bucket => {
        let id
        if (bucket.id === 'heard') {
            id = 'know_not_used'
        }
        if (bucket.id === 'neverheard') {
            id = 'never_heard_not_sure'
        }
        if (bucket.id === 'used') {
            id = 'used_it'
        }

        return {
            ...bucket,
            id
        }
    })

    const mdnLink = mdn && `https://developer.mozilla.org${mdn.url}`
    // only show descriptions for english version
    const description =
        locale === 'en-US' &&
        mdn &&
        `${parseMDNLinks(mdn.summary)} <a href="${mdnLink}">${translate('feature.mdn_link')}</a>`

    return (
        <Block
            title={name}
            units={units}
            setUnits={setUnits}
            data={{
                completion: data.experience.year.completion,
                buckets
            }}
            block={{ ...block, title: name, description }}
        >
            <div className="Feature FTBlock">
                <div className="Feature__Chart FTBlock__Chart">
                    <ChartContainer height={40} fit={true} className="FeatureChart">
                        <GaugeBarChart
                            buckets={buckets}
                            colorMapping={featureExperience}
                            units={units}
                            applyEmptyPatternTo="never_heard_not_sure"
                            i18nNamespace="featureExperience"
                        />
                    </ChartContainer>
                </div>
            </div>
        </Block>
    )
}

FeatureExperienceBlock.propTypes = {
    block: PropTypes.shape({
        id: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired
    }).isRequired,
    data: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        experience: PropTypes.shape({
            year: PropTypes.shape({
                year: PropTypes.number.isRequired,
                completion: PropTypes.shape({
                    count: PropTypes.number.isRequired,
                    percentage: PropTypes.number.isRequired
                }).isRequired,
                buckets: PropTypes.arrayOf(
                    PropTypes.shape({
                        id: PropTypes.string.isRequired,
                        usage: PropTypes.shape({
                            total: PropTypes.number.isRequired,
                            buckets: PropTypes.arrayOf(
                                PropTypes.shape({
                                    id: PropTypes.string.isRequired,
                                    count: PropTypes.number.isRequired,
                                    percentage: PropTypes.number.isRequired
                                })
                            ).isRequired
                        })
                    })
                ).isRequired
            }).isRequired
        }).isRequired
    }).isRequired
}

export default FeatureExperienceBlock
