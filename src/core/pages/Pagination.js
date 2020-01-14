import React from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import Hamburger from 'core/components/Hamburger'
import { usePageContext } from 'core/helpers/pageContext'
import LanguageSwitcher from 'core/i18n/LanguageSwitcher'
import PageLabel from './PageLabel'
import PageLink from './PageLink'

const PaginationLink = ({ page, type }) => (
    <PageLink page={page} className={`pagination__link pagination__${type}`}>
        <span className="pagination__link__label pagination__link__label--short">
            <PageLabel page={page} />
        </span>
    </PageLink>
)

PaginationLink.propTypes = {
    page: PropTypes.shape({
        id: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired
    }).isRequired,
    type: PropTypes.oneOf(['previous', 'next']).isRequired
}

const Pagination = ({ position, toggleSidebar }) => {
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
        <div
            className={`pagetitle__wrapper pagetitle__wrapper--pagination pagetitle__wrapper--${position}`}
        >
            <div className="pagetitle">
                <div className="pagetitle__inner">
                    {previous}
                    <div className="pagination__middle">
                        {position === 'top' && (
                            <>
                                <span className="PageTitle__Sidebar__Toggle">
                                    <button className="Sidebar__Toggle" onClick={toggleSidebar}>
                                        <span>
                                            <Hamburger />
                                        </span>
                                    </button>
                                </span>
                                <LanguageSwitcher />
                            </>
                        )}
                    </div>
                    {next}
                </div>
            </div>
        </div>
    )
}

Pagination.defaultProps = {
    position: PropTypes.oneOf(['top', 'bottom']).isRequired,
    toggleSidebar: PropTypes.func.isRequired
}

export default Pagination
