import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import mq from 'core/theme/mq'
import LocaleLink from 'core/components/LocaleLink'
import PageLabel from './PageLabel'

const StyledLink = styled.a`
    display: flex;
    align-items: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    justify-content: ${props => (props.type === 'previous' ? 'flex-start' : 'flex-end')};
    padding: ${props => props.theme.spacing}px;

    @media ${mq.smallMedium} {
        font-size: ${props => props.theme.typography.sizes.smaller};
    }
    @media ${mq.large} {
        font-size: ${props => props.theme.typography.sizes.medium};
    }

    &:hover {
        background: ${props => props.theme.colors.backgroundAlt};
    }
`

const PaginationLink = ({ page, type }) => (
    <LocaleLink to={page.path}>
        <StyledLink className={`pagination__link pagination__${type}`}>
            <PageLabel page={page} />
        </StyledLink>
    </LocaleLink>
)

PaginationLink.propTypes = {
    page: PropTypes.shape({
        id: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired
    }).isRequired,
    type: PropTypes.oneOf(['previous', 'next']).isRequired
}

export default PaginationLink
