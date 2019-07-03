import React, { memo, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import ShareBlock from 'core/share/ShareBlock'
import { useI18n } from 'core/i18n/i18nContext'
import AwardIcon from './AwardIcon'
import Confetti from 'react-confetti'
import { distinctColors } from '../../constants'

const Award = ({ type, items }) => {
    const { translate } = useI18n()

    const [isRevealed, setIsRevealed] = useState(false)
    const handleClick = useCallback(() => {
        setIsRevealed(true)
    }, [setIsRevealed])

    const winner = items[0]
    const runnerUps = items.slice(1)

    return (
        <div className={`Award Award--${isRevealed ? 'show' : 'hide'}`} id={type}>
            <h3 className="Award__Heading">{translate(`award.${type}.title`)}</h3>
            <div className="Award__Description">{translate(`award.${type}.description`)}</div>
            <div className="Award__Element__Container">
                <div className="Award__Element" onClick={handleClick}>
                    <div className="Award__Element__Face Award__Element__Face--front">
                        <AwardIcon />
                    </div>
                    <div className="Award__Element__Face Award__Element__Face--back">
                        {isRevealed && (
                            <div className="Award__Element__Confetti">
                                <Confetti
                                    width="500px"
                                    height="300px"
                                    recycle={false}
                                    numberOfPieces={80}
                                    initialVelocityX={5}
                                    initialVelocityY={20}
                                    confettiSource={{x: 200, y: 100, w: 100, h:100}}
                                    colors={distinctColors}
                                    />
                            </div>
                        )}
                        <span>{winner.name}</span>
                    </div>
                </div>
            </div>
            <div className="Award__Comment">
                <ReactMarkdown
                    source={translate(`award.${type}.comment`, {
                        values: { items }
                    })}
                />
                <ShareBlock
                    title={`${translate(`award.${type}.title`)} Award`}
                    id={type}
                    className="Award__Share"
                />
            </div>
            <div className="Awards__RunnerUps">
                <h4 className="Awards__RunnerUps__Heading">{translate(`awards.runner_ups`)}</h4>
                {runnerUps.map((runnerUp, i) => (
                    <div
                        key={runnerUp.id}
                        className={`Awards__RunnerUps__Item Awards__RunnerUps__Item--${i}`}
                    >
                        {i + 2}.{' '}
                        {translate(`award.runner_up`, {
                            values: { item: runnerUp }
                        })}
                    </div>
                ))}
            </div>
        </div>
    )
}

Award.propTypes = {
    type: PropTypes.oneOf([
        'feature_adoption',
        'tool_satisfaction',
        'tool_interest',
        'tool_usage',
        'tool_mention',
        'resource_usage',
        'prediction',
        'special'
    ]).isRequired,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            value: PropTypes.number.isRequired
        })
    ).isRequired
}

export default memo(Award)
