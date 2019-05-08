import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useI18n } from '../i18n/i18nContext'

const DisplayModeSwitch = ({ mode, onChange }) => {
    const { translate } = useI18n()

    return (
        <div className="ButtonGroup">
            <span
                className={classNames('Button Button--small', {
                    'Button--disabled': mode !== 'percents'
                })}
                onClick={() => {
                    onChange('percents')
                }}
            >
                {translate('percents_display_mode')}
            </span>
            <span
                className={classNames('Button Button--small', {
                    'Button--disabled': mode !== 'counts'
                })}
                onClick={() => {
                    onChange('counts')
                }}
            >
                {translate('counts_display_mode')}
            </span>
        </div>
    )
}

DisplayModeSwitch.propTypes = {
    mode: PropTypes.oneOf(['percents', 'counts']).isRequired,
    onChange: PropTypes.func.isRequired
}

export default DisplayModeSwitch
