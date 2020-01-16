import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { useI18n } from 'core/i18n/i18nContext'
import ButtonGroup from 'core/components/ButtonGroup'
import Button from 'core/components/Button'

const BlockUnitsSelector = ({ units, onChange }) => {
    const { translate } = useI18n()

    return (
        <ButtonGroup>
            <Button
                size="small"
                className={`Button--${
                    units === 'percentage' ? 'selected' : 'unselected'
                }`}
                onClick={() => onChange('percentage')}
            >
                <span className="desktop">{translate('chart_units.percentage')}</span>
                <span className="mobile">%</span>
            </Button>
            <Button
                size="small"
                className={`Button--${
                    units === 'count' ? 'selected' : 'unselected'
                }`}
                onClick={() => onChange('count')}
            >
                <span className="desktop">{translate('chart_units.count')}</span>
                <span className="mobile">Σ</span>
            </Button>
        </ButtonGroup>
    )
}

BlockUnitsSelector.propTypes = {
    units: PropTypes.oneOf(['percentage', 'count']).isRequired,
    onChange: PropTypes.func.isRequired
}

export default memo(BlockUnitsSelector)
