import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import mq from 'core/theme/mq'
import PageLabel from './PageLabel'
import PageLink from './PageLink'

const StyledLink = styled(PageLink)`
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
    <StyledLink page={page} className={`pagination__link pagination__${type}`} type={type}>
        <PageLabel page={page} />
    </StyledLink>
)

PaginationLink.propTypes = {
    page: PropTypes.shape({
        id: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired
    }).isRequired,
    type: PropTypes.oneOf(['previous', 'next']).isRequired
}

export default PaginationLink
