import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import isEmpty from 'lodash/isEmpty'
import mq from 'core/theme/mq'
import Hamburger from 'core/components/Hamburger'
import { usePageContext } from 'core/helpers/pageContext'
import LanguageSwitcher from 'core/i18n/LanguageSwitcher'
import PaginationLink from './PaginationLink'

const Container = styled.div`
    border-bottom: ${props => props.theme.separationBorder};
    z-index: 10;
    position: relative;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    
    @media ${mq.smallMedium} {
        grid-template-columns: 1fr 50px 1fr;
    }
`

const MiddleContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-left: ${props => props.theme.separationBorder};
    border-right: ${props => props.theme.separationBorder};
`

const SidebarToggle = styled.div`
    background: ${props => props.theme.colors.background};
    padding: 0;
    display: block;
    cursor: pointer;

    svg {
        display: block;
        width: 100%;
        height: auto;
        // stroke: $active-color;
    }
    
    @media ${mq.large} {
        display: none;
    }
`

const Pagination = ({ toggleSidebar }) => {
    const context = usePageContext()

    let previous = <span />
    if (context.previous !== undefined && !isEmpty(context.previous)) {
        previous = <PaginationLink page={context.previous} type="previous" />
    }

    let next = <span />
    if (context.next !== undefined && !isEmpty(context.next)) {
        next = <PaginationLink page={context.next} type="next" />
    }

    return (
        <Container>
            {previous}
            <MiddleContent>
                <SidebarToggle className="PageTitle__Sidebar__Toggle">
                    <button className="Sidebar__Toggle" onClick={toggleSidebar}>
                        <Hamburger />
                    </button>
                </SidebarToggle>
                <LanguageSwitcher />
            </MiddleContent>
            {next}
        </Container>
    )
}

Pagination.defaultProps = {
    toggleSidebar: PropTypes.func.isRequired
}

export default Pagination
