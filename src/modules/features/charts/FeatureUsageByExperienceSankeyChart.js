import React, { useMemo, useContext } from 'react'
import { ResponsiveSankey } from '@nivo/sankey'
import theme from 'nivoTheme'
import { I18nContext } from 'core/i18n/i18nContext'
import { colors, yearsOfExperience } from '../../../constants'

const reversedKeys = [...yearsOfExperience].reverse()

const FeatureUsageByExperienceSankeyChart = ({ buckets }) => {
    const { translate } = useContext(I18nContext)
    const nodes = useMemo(
        () => [
            { id: translate('features.usage.used_it') },
            ...reversedKeys.map(key => ({
                ...buckets.find(b => b.id === key),
                id: translate(`years_of_experience.${key}.short`)
            }))
        ],
        [buckets, translate]
    )
    const links = useMemo(
        () => reversedKeys.map(key => ({
            source: translate('features.usage.used_it'),
            target: translate(`years_of_experience.${key}.short`),
            value: buckets.find(b => b.id === key).filtered.percentage,
        })),
        [buckets]
    )

    return (
        <>
            <h4>usage by experience sankey?</h4>
            <div style={{ height: 200, marginTop: 30 }}>
                <ResponsiveSankey
                    margin={{
                        top: 10,
                        right: 100,
                        bottom: 10,
                        left: 120
                    }}
                    sort="input"
                    data={{ nodes, links }}
                    theme={theme}
                    animate={false}
                    colors={[colors.blue]}
                    linkContract={.5}
                    nodeBorderWidth={0}
                    nodeInnerPadding={1}
                    nodeSpacing={8}
                    labelPosition="outside"
                    linkTooltip={link => (
                        <div>
                            {link.target.id}: <strong>{link.value}%</strong>
                        </div>
                    )}
                />
            </div>
        </>
    )
}

export default FeatureUsageByExperienceSankeyChart
