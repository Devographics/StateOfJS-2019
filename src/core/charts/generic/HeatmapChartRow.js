import React, { memo, useCallback } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import get from 'lodash/get'

const HeatmapChartRow = ({
    item,
    keys,
    index,
    backgroundColorScale,
    textColorScale,
    setCurrent,
    isActive,
    isInactive,
    isEven
}) => {
    const onMouseEnter = useCallback(() => setCurrent(index), [setCurrent, index])
    const onMouseLeave = useCallback(() => setCurrent(null), [setCurrent])

    return (
        <>
            <div
                className={classNames('Heatmap__Subject', {
                    'Heatmap__Subject--even': isEven,
                    'Heatmap__Subject--active': isActive,
                    'Heatmap__Subject--inactive': isInactive
                })}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                {get(item, 'entity.name', item.id)}
            </div>
            {keys.map(keyId => {
                const cell = item.ranges.find(r => r.range === keyId)

                return (
                    <div
                        key={keyId}
                        className={classNames('Heatmap__Cell', {
                            'Heatmap__Cell--even': isEven,
                            'Heatmap__Cell--active': isActive,
                            'Heatmap__Cell--inactive': isInactive
                        })}
                        style={{
                            background: backgroundColorScale((cell && cell.percentage) || 0),
                            color: textColorScale((cell && cell.percentage) || 0)
                        }}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                    >
                        {(cell && cell.percentage) || 0}%
                    </div>
                )
            })}
        </>
    )
}

HeatmapChartRow.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.string.isRequired,
        ranges: PropTypes.arrayOf(
            PropTypes.shape({
                range: PropTypes.string.isRequired,
                count: PropTypes.number.isRequired,
                percentage: PropTypes.number.isRequired
            })
        ).isRequired
    }).isRequired,
    keys: PropTypes.arrayOf(PropTypes.string).isRequired,
    index: PropTypes.number.isRequired,
    backgroundColorScale: PropTypes.func.isRequired,
    textColorScale: PropTypes.func.isRequired,
    setCurrent: PropTypes.func.isRequired,
    isActive: PropTypes.bool.isRequired,
    isInactive: PropTypes.bool.isRequired,
    isEven: PropTypes.bool.isRequired
}

export default memo(HeatmapChartRow)
