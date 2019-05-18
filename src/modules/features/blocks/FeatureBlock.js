import React from 'react'
import PropTypes from 'prop-types'
import Block from 'core/components/Block'
import { usePageContext } from 'core/helpers/pageContext'
import { useI18n } from 'core/i18n/i18nContext'
import FeatureUsageBarChart from '../charts/FeatureUsageBarChart'
import { mergeFeaturesResources } from '../featuresHelpers'
import FeatureUsageLegends from '../charts/FeatureUsageLegends'
import ChartContainer from 'core/charts/ChartContainer'

const FeatureResources = ({ id, mdnInfo, caniuseInfo }) => {
    const { translate } = useI18n()
    return (
        <div className="Feature__Resources FTBlock__Resources">
            <h3>{translate('feature.learn_more')}</h3>
            <ul>
                {caniuseInfo.spec && (
                    <li className="Feature__Links__Item">
                        <a href={caniuseInfo.spec} title="W3C Specification">
                            {translate('feature.specification_link')}
                        </a>
                    </li>
                )}
                {mdnInfo && (
                    <li className="Feature__Links__Item">
                        <a href={`https://developer.mozilla.org${mdnInfo.url}`} title="MDN link">
                            {translate('feature.mdn_link')}
                        </a>
                    </li>
                )}
                <li className="Feature__Links__Item">
                    <a href={`https://caniuse.com/#feat=${id}`} title="CanIUse link">
                        {translate('feature.caniuse_link')}
                    </a>
                </li>
            </ul>
        </div>
    )
}

const FeatureBlock = ({ block, data }) => {
    const features = mergeFeaturesResources(data.data.aggregations, data.data.fields.resources)
    const feature = features.find(a => a.id === block.id)

    const context = usePageContext()
    const { translate } = useI18n()

    let mdnInfo
    if (feature.resources.mdn !== null && feature.resources.mdn.length > 0) {
        mdnInfo = feature.resources.mdn.find(i => i.locale === context.locale)
        if (!mdnInfo) {
            mdnInfo = feature.resources.mdn[0]
        }
    }

    const caniuseInfo = feature.resources.caniuse

    return (
        <Block id={block.id} showDescription={false}>
            <div className="Feature FTBlock">
                <div className="Feature__Chart FTBlock__Chart">
                    <FeatureUsageLegends />
                    <ChartContainer height={40}>
                        <FeatureUsageBarChart buckets={feature.usage.buckets} />
                    </ChartContainer>
                </div>
                {!context.isCapturing && (
                    <>
                        <div className="Feature__Description FTBlock__Description">
                            {mdnInfo ? (
                                <p dangerouslySetInnerHTML={{ __html: mdnInfo.summary }} />
                            ) : (
                                translate(`block.description.${block.id}`)
                            )}
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
                    }).isRequired
                })
            )
        }).isRequired
    }).isRequired
}

export default FeatureBlock
