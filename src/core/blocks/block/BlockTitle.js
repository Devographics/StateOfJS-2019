import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import last from 'lodash/last'
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

const BlockTitle = ({
    isShareable,
    isExportable = true,
    values,
    units,
    setUnits,
    data,
    block,
    switcher
}) => {
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
        blockTitle = getBlockTitle(block, context, translate, { values })
    }

    let blockDescription
    if (block.description) {
        blockDescription = block.description
    } else if (blockName) {
        blockDescription = translate(`block.description.${blockName}`)
    } else {
        blockDescription = getBlockDescription(block, context, translate, { values })
    }

    const meta = getBlockMeta(block, context, translate)

    return (
        <>
            <StyledBlockTitle
                className={`Block__Title Block__Title--${showOptions ? 'open' : 'closed'}`}
            >
                <LeftPart>
                    <h3 className="Block__Title__Text">
                        <SharePermalink url={meta.link} />
                        {blockTitle}
                    </h3>
                    {completion && <BlockCompletionIndicator completion={completion} />}
                    {isExportable && data && block && (
                        <BlockExport
                            id={id}
                            data={data}
                            block={block}
                            title={blockTitle}
                            className="Block__Title__Export"
                        />
                    )}
                    {isShareable && (
                        <ShareBlock
                            block={block}
                            className="Block__Title__Share"
                            values={values}
                            title={blockTitle}
                            toggleClass={() => {
                                setShowOptions(!showOptions)
                            }}
                        />
                    )}
                </LeftPart>
                {switcher ? (
                    <div className="Block__Title__ChartControls ChartControls">{switcher}</div>
                ) : (
                    units &&
                    setUnits && (
                        <div className="Block__Title__ChartControls ChartControls">
                            <BlockUnitsSelector units={units} onChange={setUnits} />
                        </div>
                    )
                )}
            </StyledBlockTitle>
            {showDescription && blockDescription && (
                <Description className="Block__Description">
                    <ReactMarkdown source={blockDescription} escapeHtml={false} />
                </Description>
            )}
        </>
    )
}

BlockTitle.propTypes = {
    block: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.node,
        description: PropTypes.node
    }).isRequired,
    showDescription: PropTypes.bool.isRequired,
    isShareable: PropTypes.bool.isRequired
}

BlockTitle.defaultProps = {
    showDescription: true,
    isShareable: true
}

const StyledBlockTitle = styled.div`
    border-bottom: ${props => props.theme.separationBorder};
    padding-bottom: ${props => props.theme.spacing / 2}px;
    margin-bottom: ${props => props.theme.spacing}px;
    display: flex;
    align-items: center;
`

const LeftPart = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`

const Description = styled.div`
    margin-bottom: ${props => props.theme.spacing}px;

    p {
        &:last-child {
            margin: 0;
        }
    }
`

export default memo(BlockTitle)
