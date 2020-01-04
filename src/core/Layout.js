import React, { PureComponent } from 'react'
import propTypes from 'prop-types'
import classNames from 'classnames'
import { ThemeProvider } from 'styled-components'
import '../stylesheets/screen.scss'
import Pagination from './pages/Pagination'
import Sidebar from './components/Sidebar'
import Head from './components/Head'
import { PageContextProvider } from './helpers/pageContext'
import { mergePageContext } from './helpers/pageHelpers'
import { I18nContextProvider } from './i18n/i18nContext'
import { ToolsContextProvider } from './helpers/toolsContext'
import { EntitiesContextProvider } from './entities/entitiesContext'
import PageMetaDebug from './pages/PageMetaDebug'
import theme from './theme'

export default class Layout extends PureComponent {
    static propTypes = {
        showPagination: propTypes.bool.isRequired
    }

    static defaultProps = {
        showPagination: true
    }

    constructor() {
        super()
        this.state = {
            showSidebar: false,
            showAnim: false
        }
    }

    componentDidMount() {
        this.updateWindowDimensions()
        window.addEventListener('resize', this.updateWindowDimensions)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions)
    }

    updateWindowDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight })
    }

    toggleSidebar = () => {
        this.setState({
            showSidebar: !this.state.showSidebar
        })
    }

    openSidebar = () => {
        this.setState({
            showSidebar: true
        })
    }

    closeSidebar = () => {
        this.setState({
            showSidebar: false
        })
    }

    showAnim = () => {
        this.setState({
            showAnim: true
        })
    }

    render() {
        const { showPagination, location, pageContext } = this.props
        const { showAnim, showSidebar } = this.state
        const sidebarClassName = showSidebar ? 'Sidebar--shown' : 'Sidebar--hidden'
        const context = mergePageContext(pageContext, location, this.state)

        return (
            <PageContextProvider value={context}>
                <ThemeProvider theme={theme}>
                    <I18nContextProvider>
                        <ToolsContextProvider>
                            <EntitiesContextProvider>
                                <div
                                    className={classNames(
                                        'pageLayout',
                                        `PageLayout--${context.id}`,
                                        {
                                            'PageLayout--sidebar': showSidebar,
                                            'PageLayout--nosidebar': !showSidebar,
                                            'PageLayout--anim': showAnim,
                                            'PageLayout--noanim': !showAnim,
                                            capture: context.isCapturing,
                                            nocapture: !context.isCapturing
                                        }
                                    )}
                                >
                                    <Head />
                                    <div className="pagelayout__inner">
                                        <Sidebar
                                            {...this.props}
                                            sidebarClassName={sidebarClassName}
                                            showSidebar={showSidebar}
                                            closeSidebar={this.closeSidebar}
                                        />
                                        <main className="pagelayout__content">
                                            {showPagination && (
                                                <Pagination
                                                    toggleSidebar={this.toggleSidebar}
                                                    position="top"
                                                />
                                            )}
                                            <div className="pagelayout__main">
                                                <PageMetaDebug />
                                                {this.props.children}
                                            </div>
                                        </main>
                                    </div>
                                </div>
                            </EntitiesContextProvider>
                        </ToolsContextProvider>
                    </I18nContextProvider>
                </ThemeProvider>
            </PageContextProvider>
        )
    }
}
