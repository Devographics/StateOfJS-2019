import React, { memo, useMemo } from 'react'
import PropTypes from 'prop-types'
import { keys } from '../../constants'
import { useI18n } from 'core/i18n/i18nContext'
import { useEntities } from 'core/entities/entitiesContext'
import Block from 'core/components/Block'
import HeatmapChart from 'core/charts/HeatmapChart'
import sortBy from 'lodash/sortBy'

const configByType = {
    salary: {
        keys: keys.salary,
        i18nNamespace: 'salary'
    },
    experience: {
        keys: keys.yearsOfExperience,
        i18nNamespace: 'years-of-experience'
    }
}

const getConfig = block => {
    const config = configByType[block.heatmapType]
    if (!config) {
        throw new Error(`HeatmapBlock: Invalid heatmap type: ${block.heatmapType}`)
    }

    return config
}

const getChartData = (data, block, config, getName) => {
    if (!data || !data.data) {
        throw new Error(`HeatmapBlock: Missing data for block ${block.id}, page data is undefined`)
    }

    let items = data.data.aggregations.find(agg => agg.id === block.id)
    if (items) {
        items = items.heatmap
    }
    if (!items) {
        throw new Error(`HeatmapBlock: Missing data for block ${block.id}`)
    }
    items = items.map(item => {
        const itemWithKeys = {
            ...item,
            name: getName(item.id)
        }

        const total = item.buckets.reduce((t, b) => t + b.relative_percentage, 0)
        itemWithKeys.average = Number((total / config.keys.length).toFixed(2))

        config.keys.forEach(key => {
            let bucket = item.buckets.find(b => b.id === key)
            if (!bucket) {
                bucket = {
                    id: key,
                    count: 0,
                    relative_percentage: 0,
                    absolute_percentage: 0
                }
            }

            itemWithKeys[key] = {
                ...bucket,
                diff: Number((bucket.relative_percentage - itemWithKeys.average).toFixed(2))
            }
        })

        return itemWithKeys
    })

    items = sortBy(items, 'average').reverse()

    return items
}

const HeatmapBlock = ({ block, data }) => {
    const { translate } = useI18n()
    const { getName } = useEntities()

    const config = useMemo(() => getConfig(block), [block])
    const items = useMemo(() => getChartData(data, block, config, getName), [
        data,
        block,
        config,
        getName
    ])

    return (
        <Block
            id={block.id}
            title={translate(`block.title.${block.subject}_${block.heatmapType}_heatmap`)}
            description={translate(
                `block.description.${block.subject}_${block.heatmapType}_heatmap`
            )}
            showDescription={true}
        >
            <HeatmapChart keys={config.keys} items={items} i18nNamespace={config.i18nNamespace} />
        </Block>
    )
}

HeatmapBlock.propTypes = {
    block: PropTypes.shape({
        id: PropTypes.string.isRequired,
        heatmapType: PropTypes.oneOf(['experience', 'salary']).isRequired,
        subject: PropTypes.oneOf(['tools', 'features']).isRequired
    }).isRequired
}

export default memo(HeatmapBlock)
