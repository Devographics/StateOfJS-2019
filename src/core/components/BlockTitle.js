import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown/with-html'
import ShareBlock from '../share/ShareBlock'
import { useI18n } from '../i18n/i18nContext'
import { usePageContext } from '../helpers/pageContext'
import { getBlockTitle, getBlockDescription } from 'core/helpers/blockHelpers'
import { getBlockMeta } from '../helpers/blockHelpers'
import SharePermalink from '../share/SharePermalink'
import ChartUnitsSelector from 'core/charts/ChartUnitsSelector'
import { colors, totalCount } from '../../constants'

const CompletionIndicator = ({ total }) => {
    const { translate } = useI18n()
    const completionPercentage = Math.round((total / totalCount) * 100)
    return (
        <div className="CompletionIndicator">
            <div className="CompletionIndicator__Tooltip">
                {translate('general.completion_percentage')}{' '}
                <strong>{completionPercentage}%</strong>
            </div>
            <div className="CompletionIndicator__Data">
                {translate('general.completion_percentage')}{' '}
                <strong>{completionPercentage}%</strong>
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
                    strokeDasharray={`calc(${completionPercentage} * 31.4 / 100) 31.4`}
                    transform="rotate(-90) translate(-20)"
                />
            </svg>
        </div>
    )
}

const BlockTitle = ({
    id,
    showDescription,
    isShareable,
    values,
    title,
    units,
    setUnits,
    total
}) => {
    const [showOptions, setShowOptions] = useState(false)
    const context = usePageContext()
    const { translate } = useI18n()

    title = title || getBlockTitle(id, context, translate, { values })

    let description = ''
    if (showDescription === true) {
        description = getBlockDescription(id, context, translate, {
            values
        })
    }
    const meta = getBlockMeta(id, context, translate)

    return (
        <div className={`Block__Heading Block__Heading--${id}`}>
            <div className={`Block__Title Block__Title--${showOptions ? 'open' : 'closed'}`}>
                <div className="Block__Title__Left">
                    <h3 className="Block__Title__Text Block__Title__Text--short">
                        <SharePermalink url={meta.link} />
                        {title}
                    </h3>
                    {total && <CompletionIndicator total={total} />}
                    {/* <h3 className="Block__Title__Text Block__Title__Text--full">
                    {title || translate(`fullcharts.${id}`, { values })}
                </h3> */}
                    {isShareable && (
                        <ShareBlock
                            id={id}
                            className="Block__Title__Share"
                            values={values}
                            title={title}
                            toggleClass={() => {
                                setShowOptions(!showOptions)
                            }}
                        />
                    )}
                </div>
                <div className="Block__Title__Right">
                    {units && setUnits && (
                        <div className="Block__Title__ChartControls ChartControls">
                            {/* <ChartModeSelector mode={mode} onChange={setMode} /> */}
                            <ChartUnitsSelector units={units} onChange={setUnits} />
                        </div>
                    )}
                </div>
            </div>
            {showDescription && (
                <div className="Block__Description">
                    <ReactMarkdown source={description} escapeHtml={false} />
                </div>
            )}
        </div>
    )
}

BlockTitle.propTypes = {
    id: PropTypes.string.isRequired,
    showDescription: PropTypes.bool.isRequired,
    isShareable: PropTypes.bool.isRequired
}

BlockTitle.defaultProps = {
    showDescription: true,
    isShareable: true
}

export default BlockTitle
