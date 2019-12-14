import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Block from 'core/blocks/block/Block'
import { usePageContext } from 'core/helpers/pageContext'
import { useI18n } from 'core/i18n/i18nContext'
// import { mergeFeaturesResources } from '../featuresHelpers'
import FeatureExperienceLegends from '../charts/FeatureExperienceLegends'
import ChartContainer from 'core/charts/ChartContainer'
import { usage } from 'core/constants.js'
import GaugeBarChart from 'core/charts/GaugeBarChart'
import { useEntities } from 'core/entities/entitiesContext'
import FeatureResources from 'modules/features/components/FeatureResources'

// convert relative links into absolute MDN links
const parseMDNLinks = content =>
    content.replace(new RegExp(`href="/`, 'g'), `href="https://developer.mozilla.org/`)

const FeatureBlock = ({ block, data, units: defaultUnits = 'percentage' }) => {
    const { getName } = useEntities()

    const [units, setUnits] = useState(defaultUnits)

    const context = usePageContext()
    const { translate } = useI18n()

    // @todo: restore the resources logic
    /*
    const features = mergeFeaturesResources(data.data.aggregations, data.data.fields.resources)
    const feature = features.find(a => a.id === block.id)

    let mdnInfo
    if (feature.resources.mdn !== null && feature.resources.mdn.length > 0) {
        mdnInfo = feature.resources.mdn.find(i => i.locale === context.locale)
        if (!mdnInfo) {
            mdnInfo = feature.resources.mdn[0]
        }
    }

    const caniuseInfo = feature.resources.caniuse
    */

    const feature = {
        resources: {
            id: block.id
        }
    }
    const mdnInfo = undefined
    const caniuseInfo = undefined

    // @todo: handle normalization directly in the survey
    const buckets = data.buckets.map(bucket => {
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

    return (
        <Block
            id={block.id}
            title={translate(`feature.${block.id}`, {}, getName(block.id))}
            showDescription={false}
            units={units}
            setUnits={setUnits}
            completion={data.completion}
            data={buckets}
            block={block}
        >
            <div className="Feature FTBlock">
                <div className="Feature__Chart FTBlock__Chart">
                    <ChartContainer height={40} fit={true} className="FeatureChart">
                        <GaugeBarChart
                            buckets={buckets}
                            mapping={usage}
                            units={units}
                            applyEmptyPatternTo="never_heard_not_sure"
                            i18nNamespace="features.usage"
                        />
                    </ChartContainer>
                    <FeatureExperienceLegends data={data.buckets} units={units} />
                </div>
                {!context.isCapturing && (
                    <>
                        <div className="Feature__Description FTBlock__Description">
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: mdnInfo
                                        ? parseMDNLinks(mdnInfo.summary)
                                        : translate(`block.description.${block.id}`)
                                }}
                            />
                        </div>
                        <FeatureResources
                            id={feature.resources.id}
                            mdnInfo={mdnInfo}
                            caniuseInfo={caniuseInfo}
                        />
                    </>
                )}
            </div>
        </Block>
    )
}

FeatureBlock.propTypes = {
    block: PropTypes.shape({
        id: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired
    }).isRequired,
    data: PropTypes.shape({
        data: PropTypes.shape({
            aggregations: PropTypes.arrayOf(
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
            )
        }).isRequired
    }).isRequired
}

export default FeatureBlock
