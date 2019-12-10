import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { useI18n } from 'core/i18n/i18nContext'

const ChartModeSelector = ({ mode, onChange }) => {
    const { translate } = useI18n()

    return (
        <div className="ChartModeSelector">
            <span className="ChartModeSelector__Label">{translate('chart_mode')}</span>
            <span className="ButtonGroup">
                <span
                    className={`Button Button--small Button--${
                        mode === 'absolute' ? 'active' : 'disabled'
                    }`}
                    onClick={() => onChange('absolute')}
                >
                    {translate('chart_mode.absolute')}
                </span>
                <span
                    className={`Button Button--small Button--${
                        mode === 'relative' ? 'active' : 'disabled'
                    }`}
                    onClick={() => onChange('relative')}
                >
                    {translate('chart_mode.relative')}
                </span>
            </span>
        </div>
    )
}

ChartModeSelector.propTypes = {
    mode: PropTypes.oneOf(['absolute', 'relative']).isRequired,
    onChange: PropTypes.func.isRequired
}

export default memo(ChartModeSelector)
