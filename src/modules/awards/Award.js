import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import ShareBlock from 'core/share/ShareBlock'
import ShareBlockDebug from 'core/share/ShareBlockDebug'
import slugify from 'core/helpers/slugify'
import { useI18n } from 'core/i18n/i18nContext'

const Award = ({ type, tools: _tools }) => {
    const { translate } = useI18n()

    const [isRevealed, setIsRevealed] = useState(false)

    const handleClick = () => {
        setIsRevealed(true)
    }

    const blockId = slugify(type)

    const tools = _tools.map(tool => ({
        ...tool,
        label: tool.id
    }))

    const winner = tools[0]
    const runnerUps = tools.slice(1)

    return (
        <div className={`Award Award--${isRevealed ? 'show' : 'hide'}`} id={blockId}>
            <h3 className="Award__Heading">{translate(`block.title.${type}`)}</h3>
            <div className="Award__Description">{translate(`block.description.${type}`)}</div>
            <div className="Award__Element__Container">
                <div className="Award__Element" onClick={handleClick}>
                    <div className="Award__Element__Face Award__Element__Face--front">?</div>
                    <div className="Award__Element__Face Award__Element__Face--back">
                        {winner.label}
                    </div>
                </div>
            </div>
            <div className="Award__Comment">
                <ReactMarkdown
                    source={translate(`award.${type}.comment`, {
                        values: { tools }
                    })}
                />
                <ShareBlock
                    title={`${translate(`award.${type}.heading`)} Award`}
                    id={blockId}
                    className="Award__Share"
                />
                <ShareBlockDebug id={blockId} />
            </div>
            <div className="Awards__RunnerUps">
                <h4 className="Awards__RunnerUps__Heading">{translate(`awards.runner_ups`)}</h4>
                {runnerUps.map((runnerUp, i) => (
                    <div
                        key={runnerUp.id}
                        className={`Awards__RunnerUps__Item Awards__RunnerUps__Item--${i}`}
                    >
                        {i + 2}.{' '}
                        {translate(`award.${type}.runner_up`, {
                            values: { tool: runnerUp }
                        })}
                    </div>
                ))}
            </div>
        </div>
    )
}

Award.propTypes = {
    type: PropTypes.oneOf([
        'highest_satisfaction',
        'highest_interest',
        'highest_usage',
        'most_mentioned',
        'prediction',
        'special'
    ]).isRequired,
    tools: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired
        })
    ).isRequired
}

export default Award
