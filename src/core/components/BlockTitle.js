import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown/with-html'
import ShareBlock from 'core/share/ShareBlock'
import ExportBlock from 'core/export/ExportBlock'
import { useI18n } from 'core/i18n/i18nContext'
import { usePageContext } from 'core/helpers/pageContext'
import { getBlockTitle, getBlockDescription } from 'core/helpers/blockHelpers'
import { getBlockMeta } from 'core/helpers/blockHelpers'
import SharePermalink from 'core/share/SharePermalink'
import ChartUnitsSelector from 'core/charts/ChartUnitsSelector'
import CompletionIndicator from './CompletionIndicator'
import last from 'lodash/last'

const BlockTitle = ({
    isShareable,
    isExportable = true,
    values,
    units,
    setUnits,
    data,
    block
}) => {
    const { id, title: titleOverride, description: descriptionOverride, showDescription } = block
    const completion = data && (Array.isArray(data) ? last(data).completion : data.completion)
    const [showOptions, setShowOptions] = useState(false)
    const context = usePageContext()
    const { translate } = useI18n()

    const title = titleOverride || getBlockTitle(id, context, translate, { values })

    let description = ''
    if (showDescription === true) {
        description =
            descriptionOverride ||
            getBlockDescription(id, context, translate, {
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
                    {completion && <CompletionIndicator completion={completion} />}
                    {/*
                    <h3 className="Block__Title__Text Block__Title__Text--full">
                        {title || translate(`fullcharts.${id}`, { values })}
                    </h3>
                    */}
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
                    {isExportable && data && block && (
                        <ExportBlock
                            id={id}
                            data={data}
                            block={block}
                            title={title}
                            className="Block__Title__Export"
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
    block: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.node,
        description: PropTypes.node
    }).isRequired,
    // data: PropTypes.shape({
    //     completion: PropTypes.shape({
    //         count: PropTypes.number.isRequired,
    //         percentage: PropTypes.number.isRequired
    //     })
    // }),
    showDescription: PropTypes.bool.isRequired,
    isShareable: PropTypes.bool.isRequired,
}

BlockTitle.defaultProps = {
    showDescription: true,
    isShareable: true
}

export default memo(BlockTitle)
