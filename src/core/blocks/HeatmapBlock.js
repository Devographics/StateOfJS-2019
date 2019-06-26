import React, { memo, useMemo } from 'react'
import PropTypes from 'prop-types'
import { keys } from '../../constants'
import { useI18n } from '../i18n/i18nContext'
import Block from 'core/components/Block'
import HeatmapChart from 'core/charts/HeatmapChart'

const getChartData = (data, block) => {
    const bucketKeys = keys[block.bucketKeys]
    if (!Array.isArray(bucketKeys)) {
        throw new Error(
            `ExperienceHeatmapBlock: Missing bucket keys for block ${
                block.id
            }, bucketKeys: ${block.bucketKeys || 'undefined'}`
        )
    }

    if (!data || !data.data) {
        throw new Error(
            `ExperienceHeatmapBlock: Missing data for block ${block.id}, page data is undefined`
        )
    }

    let items = data.data.aggregations.find(agg => agg.id === block.id)
    if (items) {
        items = items.heatmap
    }
    if (!items) {
        throw new Error(`ExperienceHeatmapBlock: Missing data for block ${block.id}`)
    }
    items = items.map(item => {
        const itemWithKeys = { ...item }
        bucketKeys.forEach(key => {
            let bucket = item.buckets.find(b => b.id === key)
            if (!bucket) {
                bucket = {
                    id: key,
                    count: 0,
                    absolute_percentage: 0,
                    relative_percentage: 0,
                }
            }

            itemWithKeys[key] = bucket
        })

        return itemWithKeys
    })

    return { bucketKeys, items }
}

const HeatmapBlock = ({ block, data }) => {
    const { translate } = useI18n()

    const { bucketKeys, items } = useMemo(
        () => getChartData(data, block),
        [data, block]
    )

    return (
        <Block id={block.id} title={translate(`block.title.${block.subject}_${block.heatmapType}_heatmap`)} showDescription={true}>
            <HeatmapChart bucketKeys={bucketKeys} items={items}/>
        </Block>
    )
}

HeatmapBlock.propTypes = {
    block: PropTypes.shape({
        id: PropTypes.string.isRequired,
        heatmapType: PropTypes.oneOf(['experience', 'salary']).isRequired,
        subject: PropTypes.oneOf(['tools', 'features']).isRequired,
    }).isRequired,
}

export default memo(HeatmapBlock)
