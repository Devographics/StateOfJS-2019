import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { useI18n } from 'core/i18n/i18nContext'
import { useEntities } from 'core/entities/entitiesContext'

/**
 * This tooltip can be used for general bar charts:
 * - HorizontalBarChart
 * - VerticalBarChart
 */
const BarTooltip = ({ indexValue, data, i18nNamespace, shouldTranslate }) => {
    const { getName } = useEntities()
    const { translate } = useI18n()
    const label = shouldTranslate
        ? translate(`${i18nNamespace}.${indexValue}.long`)
        : getName(indexValue)
    return (
        <div style={{ maxWidth: 300 }}>
            {label}:&nbsp;
            <strong>{data.percentage}%</strong>
            &nbsp;({data.count})
        </div>
    )
}

BarTooltip.propTypes = {
    indexValue: PropTypes.string.isRequired,
    data: PropTypes.shape({
        percentage: PropTypes.number.isRequired,
        count: PropTypes.number.isRequired
    }).isRequired,
    i18nNamespace: PropTypes.string.isRequired,
    shouldTranslate: PropTypes.bool.isRequired
}

export default memo(BarTooltip)
