import React, { memo, useMemo } from 'react'
import PropTypes from 'prop-types'
import { salaryArray, workExperienceArray, companySizeArray } from 'core/constants.js'
// import { useI18n } from 'core/i18n/i18nContext'
import { useEntities } from 'core/entities/entitiesContext'
import Block from 'core/blocks/block/Block'
import HeatmapChart from 'core/charts/generic/HeatmapChart'
import sortBy from 'lodash/sortBy'

const configByType = {
    salary: {
        keys: salaryArray,
        i18nNamespace: 'salary'
    },
    workExperience: {
        keys: workExperienceArray,
        i18nNamespace: 'workExperience'
    },
    companySize: {
        keys: companySizeArray,
        i18nNamespace: 'companySize'
    }
}

const getConfig = heatmapId => {
    const config = configByType[heatmapId]
    if (!config) {
        throw new Error(`HeatmapBlock: Invalid heatmap type: ${heatmapId}`)
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
    const { blockName } = block
    // const { translate } = useI18n()
    // const { getName } = useEntities()

    const config = useMemo(() => getConfig(block.variables.heatmapId), [block.variables.heatmapId])
    // const items = useMemo(() => getChartData(data, block, config, getName), [
    //     data,
    //     block,
    //     config,
    //     getName
    // ])

    console.log({ block, data, config })

    return (
        <Block data={data.buckets} block={block}>
            <HeatmapChart
                keys={config.keys}
                data={data.buckets}
                i18nNamespace={config.i18nNamespace}
            />
        </Block>
    )
}

HeatmapBlock.propTypes = {
    block: PropTypes.shape({
        id: PropTypes.string.isRequired,
        variables: PropTypes.shape({
            subject: PropTypes.oneOf(['tools', 'features']).isRequired,
            heatmapId: PropTypes.oneOf(['workExperience', 'salary', 'companySize']).isRequired
        }).isRequired
    }).isRequired,
    data: PropTypes.shape({
        year: PropTypes.number.isRequired,
        buckets: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                total: PropTypes.number.isRequired,
                ranges: PropTypes.arrayOf(
                    PropTypes.shape({
                        range: PropTypes.string.isRequired,
                        count: PropTypes.number.isRequired,
                        percentage: PropTypes.number.isRequired
                    })
                ).isRequired
            })
        ).isRequired
    })
}

export default memo(HeatmapBlock)
