import React, { memo } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useI18n } from 'core/i18n/i18nContext'

const BlockCompletionIndicator = ({ completion }) => {
    const { translate } = useI18n()

    return (
        <Container className="CompletionIndicator">
            <Tooltip className="CompletionIndicator__Tooltip">
                {translate('general.completion_percentage')}{' '}
                <strong>{completion.percentage}%</strong> ({completion.count})
            </Tooltip>
            <div className="CompletionIndicator__Data">
                {translate('general.completion_percentage')}{' '}
                <strong>{completion.percentage}%</strong> ({completion.count})
            </div>
            <Chart height="16" width="16" viewBox="0 0 20 20">
                <circle className="CompletionIndicator__Chart__Bg" r="10" cx="10" cy="10" />
                <circle
                    className="CompletionIndicator__Chart__Fg"
                    r="5"
                    cx="10"
                    cy="10"
                    fill="transparent"
                    strokeWidth="10"
                    strokeDasharray={`calc(${completion.percentage} * 31.4 / 100) 31.4`}
                    transform="rotate(-90) translate(-20)"
                />
            </Chart>
        </Container>
    )
}

BlockCompletionIndicator.propTypes = {
    completion: PropTypes.shape({
        count: PropTypes.number.isRequired,
        percentage: PropTypes.number.isRequired
    }).isRequired
}

const Tooltip = styled.div`
    left: 50%;
    position: absolute;
    padding: 4px 8px;
    white-space: nowrap;
    transform: translate(-50%, -130%);
    opacity: 0;
    font-size: ${props => props.theme.typography.sizes.small};
    border-radius: 3px;
    transition: all 200ms ease-in;
    pointer-events: none;

    &:after {
        top: 99%;
        left: 50%;
        content: ' ';
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
        margin-left: -8px;
    }
`

const Container = styled.div`
    margin-left: ${props => props.theme.spacing / 2}px;
    position: relative;
    padding: 2px;

    &:hover ${Tooltip} {
        opacity: 1;
        transform: translate(-50%, -140%);
        transition: all 200ms ease-in;
    }
`

const Chart = styled.svg`
    display: block;
`

export default memo(BlockCompletionIndicator)
