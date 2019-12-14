import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown/with-html'
import ShareBlock from 'core/share/ShareBlock'
import BlockExport from 'core/blocks/block/BlockExport'
import { useI18n } from 'core/i18n/i18nContext'
import { usePageContext } from 'core/helpers/pageContext'
import { getBlockTitle, getBlockDescription } from 'core/helpers/blockHelpers'
import { getBlockMeta } from 'core/helpers/blockHelpers'
import SharePermalink from 'core/share/SharePermalink'
import BlockUnitsSelector from 'core/blocks/block/BlockUnitsSelector'
import BlockCompletionIndicator from 'core/blocks/block/BlockCompletionIndicator'
import last from 'lodash/last'

const BlockTitle = ({ isShareable, isExportable = true, values, units, setUnits, data, block }) => {
    const { id, blockName, showDescription = true } = block
    const completion = data && (Array.isArray(data) ? last(data).completion : data.completion)
    const [showOptions, setShowOptions] = useState(false)
    const context = usePageContext()
    const { translate } = useI18n()

    let blockTitle
    if (block.title) {
        blockTitle = block.title
    } else if (blockName) {
        blockTitle = translate(`block.title.${blockName}`)
    } else {
        blockTitle = getBlockTitle(id, context, translate, { values })
    }

    let blockDescription
    if (block.description) {
        blockDescription = block.description
    } else if (blockName) {
        blockDescription = translate(`block.description.${blockName}`)
    } else {
        blockDescription = getBlockDescription(id, context, translate, { values })
    }

    const meta = getBlockMeta(id, context, translate)

    return (
        <div className={`Block__Heading Block__Heading--${id}`}>
            <div className={`Block__Title Block__Title--${showOptions ? 'open' : 'closed'}`}>
                <div className="Block__Title__Left">
                    <h3 className="Block__Title__Text Block__Title__Text--short">
                        <SharePermalink url={meta.link} />
                        {blockTitle}
                    </h3>
                    {completion && <BlockCompletionIndicator completion={completion} />}
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
                            title={blockTitle}
                            toggleClass={() => {
                                setShowOptions(!showOptions)
                            }}
                        />
                    )}
                    {isExportable && data && block && (
                        <BlockExport
                            id={id}
                            data={data}
                            block={block}
                            title={blockTitle}
                            className="Block__Title__Export"
                        />
                    )}
                </div>
                <div className="Block__Title__Right">
                    {units && setUnits && (
                        <div className="Block__Title__ChartControls ChartControls">
                            {/* <ChartModeSelector mode={mode} onChange={setMode} /> */}
                            <BlockUnitsSelector units={units} onChange={setUnits} />
                        </div>
                    )}
                </div>
            </div>
            {showDescription && blockDescription && (
                <div className="Block__Description">
                    <ReactMarkdown source={blockDescription} escapeHtml={false} />
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
    isShareable: PropTypes.bool.isRequired
}

BlockTitle.defaultProps = {
    showDescription: true,
    isShareable: true
}

export default memo(BlockTitle)
