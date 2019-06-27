import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { useI18n } from '../i18n/i18nContext'

const CompletionIndicator = ({ completion }) => {
    const { translate } = useI18n()

    return (
        <div className="CompletionIndicator">
            <div className="CompletionIndicator__Tooltip">
                {translate('general.completion_percentage')}{' '}
                <strong>{completion.percentage}%</strong> ({completion.count})
            </div>
            <div className="CompletionIndicator__Data">
                {translate('general.completion_percentage')}{' '}
                <strong>{completion.percentage}%</strong> ({completion.count})
            </div>
            <svg className="CompletionIndicator__Chart" height="16" width="16" viewBox="0 0 20 20">
                <circle className="CompletionIndicator__Chart__Bg" r="10" cx="10" cy="10" />
                <circle
                    className="CompletionIndicator__Chart__Fg"
                    r="5"
                    cx="10"
                    cy="10"
                    fill="transparent"
                    strokeWidth="10"
                    strokeDasharray={`calc(${completion.percentage} * 31.4 / 100) 31.4`}
                    transform="rotate(-90) translate(-20)"
                />
            </svg>
        </div>
    )
}

CompletionIndicator.propTypes = {
    completion: PropTypes.shape({
        count: PropTypes.number.isRequired,
        percentage: PropTypes.number.isRequired
    }).isRequired
}

export default memo(CompletionIndicator)
