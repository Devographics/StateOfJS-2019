import React from 'react'
import { Link } from 'gatsby'
import { usePageContext } from 'core/helpers/pageContext'

const LocaleLink = ({ to, ...rest }) => {
    const context = usePageContext()
    return <Link {...rest} to={`${context.localePath}${to}`} />
}

export default LocaleLink
