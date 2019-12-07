import React, { memo, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import Block from 'core/components/Block'
import ChartContainer from 'core/charts/ChartContainer'
import HorizontalBarChart from 'core/charts/HorizontalBarChart'

const HorizontalBarBlock = ({ block, data }) => {
    const {
        id,
        showDescription,
        mode = 'relative',
        units: defaultUnits = 'percentage',
        translateData
    } = block

    const [units, setUnits] = useState(defaultUnits)

    const { completion, total, buckets } = data

    return (
        <Block
            id={id}
            showDescription={showDescription}
            units={units}
            setUnits={setUnits}
            completion={completion}
            data={buckets}
            block={block}
        >
            <ChartContainer fit={true}>
                <HorizontalBarChart
                    total={total}
                    buckets={buckets}
                    i18nNamespace={id}
                    translateData={translateData}
                    mode={mode}
                    units={units}
                />
            </ChartContainer>
        </Block>
    )
}

HorizontalBarBlock.propTypes = {
    block: PropTypes.shape({
        id: PropTypes.string.isRequired,
        dataKey: PropTypes.string.isRequired,
        showDescription: PropTypes.bool,
        translateData: PropTypes.bool,
        mode: PropTypes.oneOf(['absolute', 'relative']),
        units: PropTypes.oneOf(['percentage', 'count'])
    }).isRequired,
    data: PropTypes.shape({
        data: PropTypes.shape({
            aggregations: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.string.isRequired
                })
            ).isRequired
        }).isRequired
    }).isRequired
}

export default memo(HorizontalBarBlock)
