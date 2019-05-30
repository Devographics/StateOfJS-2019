import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { usePageContext } from '../helpers/pageContext'

const PageLink = ({ page, children, ...rest }) => {
    const context = usePageContext()

    return <Link {...rest} to={`${context.localePath}${page.path}`}><span>{children}</span></Link>
}

PageLink.propTypes = {
    page: PropTypes.shape({
        path: PropTypes.string.isRequired
    }).isRequired
}

export default PageLink
