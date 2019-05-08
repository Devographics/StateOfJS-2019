import React from 'react'
import PropTypes from 'prop-types'
import { useI18n } from 'core/i18n/i18nContext'
import { countryNameToTranslationKey } from 'core/i18n/translation-key-getters'

const SalaryPerCountryMapChartTooltip = ({ feature: { properties, data } }) => {
    const { translate } = useI18n()

    return (
        <>
            <strong>{translate(countryNameToTranslationKey(properties.name))}</strong>
            <br />
            {translate('average')}:{' '}
            <strong>${data.salary.average.toFixed(3).replace('.', ',')}</strong>
        </>
    )
}

SalaryPerCountryMapChartTooltip.propTypes = {
    feature: PropTypes.shape({
        properties: PropTypes.shape({
            name: PropTypes.string.isRequired
        }).isRequired,
        data: PropTypes.shape({
            salary: PropTypes.shape({
                average: PropTypes.number.isRequired
            }).isRequired
        }).isRequired
    }).isRequired
}

export default SalaryPerCountryMapChartTooltip
