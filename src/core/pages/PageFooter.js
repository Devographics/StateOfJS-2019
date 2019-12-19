import React from 'react'
import { usePageContext } from '../helpers/pageContext'
import { useI18n } from '../i18n/i18nContext'
import PageLabel from './PageLabel'
import { Link } from 'gatsby'
import isEmpty from 'lodash/isEmpty'

const PageFooter = () => {
    const context = usePageContext()
    const { translate } = useI18n()

    return (
        <footer className="PageFooter">
            <div className="PageFooter__Nav">
                {context.previous && !isEmpty(context.previous) && (
                    <Link
                        className="PageFooter__Link PageFooter__Link--previous"
                        to={`${context.localePath}${context.previous.path}`}
                    >
                        « {translate('general.previous')} <PageLabel page={context.previous} />
                    </Link>
                )}
                {context.next && !isEmpty(context.next) && (
                    <Link
                        className="PageFooter__Link PageFooter__Link--next Button"
                        to={`${context.localePath}${context.next.path}`}
                    >
                        {translate('general.next')} <PageLabel page={context.next} /> »
                    </Link>
                )}
            </div>
            <div className="PageFooter__Footer">
                &copy; 2019 <a href="http://stateofjs.com/">State of JavaScript</a>.{' '}
                Questions? Found a bug?{' '}
                <a href="https://github.com/StateOfJS/State-of-JS-2019/issues">Leave an issue</a>
            </div>
        </footer>
    )
}

export default PageFooter
