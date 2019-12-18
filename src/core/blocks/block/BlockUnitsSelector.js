import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { useI18n } from 'core/i18n/i18nContext'

const BlockUnitsSelector = ({ units, onChange }) => {
    const { translate } = useI18n()

    return (
        <div className="BlockUnitsSelector">
            {/* <span className="BlockUnitsSelector__Label">{translate('chart_units')}</span> */}
            <span className="ButtonGroup">
                <span
                    className={`Button Button--small Button--${
                        units === 'percentage' ? 'selected' : 'unselected'
                    }`}
                    onClick={() => onChange('percentage')}
                >
                    <span className="desktop">{translate('chart_units.percentage')}</span>
                    <span className="mobile">%</span>
                </span>
                <span
                    className={`Button Button--small Button--${
                        units === 'count' ? 'selected' : 'unselected'
                    }`}
                    onClick={() => onChange('count')}
                >
                    <span className="desktop">{translate('chart_units.count')}</span>
                    <span className="mobile">Σ</span>
                </span>
            </span>
        </div>
    )
}

BlockUnitsSelector.propTypes = {
    units: PropTypes.oneOf(['percentage', 'count']).isRequired,
    onChange: PropTypes.func.isRequired
}

export default memo(BlockUnitsSelector)
