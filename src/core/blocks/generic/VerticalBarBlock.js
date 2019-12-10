import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import { keys } from 'core/constants.js'
import Block from 'core/blocks/block/Block'
import Legends from 'core/blocks/block/BlockLegends'
import ChartContainer from 'core/charts/ChartContainer'
import VerticalBarChart from 'core/charts/generic/VerticalBarChart'
import { useI18n } from 'core/i18n/i18nContext'
import { usePageContext } from 'core/helpers/pageContext'

const VerticalBarBlock = ({ block, data }) => {
    if (!data) {
        throw new Error(
            `VerticalBarBlock: Missing data for block ${block.id}, page data is undefined`
        )
    }
    const {
        id,
        showDescription,
        showLegend,
        mode = 'relative',
        units: defaultUnits = 'percentage',
        translateData,
        bucketKeysName = id
    } = block

    const context = usePageContext()
    const { width } = context

    const { translate } = useI18n()

    const [units, setUnits] = useState(defaultUnits)

    const bucketKeys = keys[bucketKeysName]

    if (!bucketKeys) {
        throw new Error(`Could not find bucket keys for "${bucketKeysName}"`)
    }

    const { buckets, total, completion } = data

    const sortedBuckets = bucketKeys.map(bucketKey => {
        const bucket = buckets.find(b => b.id === bucketKey)
        if (bucket === undefined) {
            return {
                id: bucketKey,
                count: 0,
                percentage: 0
            }
            // throw new Error(`no bucket found for key: '${bucketKey}' in block: ${block.id}`)
        }
        return bucket
    })

    const legends = bucketKeys.map(key => ({
        id: `${block.id}.${key}`,
        label: translate(`${block.id}.${key}.long`),
        keyLabel: `${translate(`${block.id}.${key}.short`)}:`
    }))

    return (
        <Block
            showDescription={showDescription}
            units={units}
            setUnits={setUnits}
            completion={completion}
            data={sortedBuckets}
            block={block}
        >
            <ChartContainer fit={true}>
                <VerticalBarChart
                    keys={bucketKeys}
                    total={total}
                    buckets={sortedBuckets}
                    i18nNamespace={block.id}
                    translateData={translateData}
                    mode={mode}
                    units={units}
                    viewportWidth={width}
                />
            </ChartContainer>
            {showLegend && (
                <Legends
                    legends={legends}
                    layout="vertical"
                    units={units}
                    data={sortedBuckets.map(b => ({ ...b, id: `${block.id}.${b.id}` }))}
                />
            )}
        </Block>
    )
}

VerticalBarBlock.propTypes = {
    block: PropTypes.shape({
        id: PropTypes.string.isRequired,
        dataPath: PropTypes.string.isRequired,
        bucketKeysName: PropTypes.oneOf(Object.keys(keys)),
        showDescription: PropTypes.bool,
        mode: PropTypes.oneOf(['absolute', 'relative']),
        units: PropTypes.oneOf(['percentage', 'count'])
    }).isRequired,
    data: PropTypes.shape({
        buckets: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired
            })
        ).isRequired
    }).isRequired
}

export default memo(VerticalBarBlock)
