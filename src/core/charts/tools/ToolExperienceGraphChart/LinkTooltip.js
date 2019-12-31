import React from 'react'
import { useI18n } from 'core/i18n/i18nContext'

const LinkTooltip = link => {
    const { translate } = useI18n()
    console.log({ link })

    return (
        <div>
            {translate('toolExperienceGraph.link.tooltip', {
                values: {
                    count: link.value,
                    previousYear: link.source.year,
                    previousExperience: link.source.experience,
                    nextYear: link.target.year,
                    nextExperience: link.target.experience,
                }
            })}
        </div>
    )
}

export default LinkTooltip
