import { PureComponent, useCallback, useEffect, useState } from 'react'
import propTypes from 'prop-types'
import { withRouter } from 'next/router'
import classNames from 'classnames'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import Pagination from './pages/Pagination'
import Sidebar from './components/Sidebar'
import Head from './components/Head'
import { PageContextProvider } from './helpers/pageContext'
import { mergePageContext } from './helpers/pageHelpers'
import { I18nContextProvider } from './i18n/i18nContext'
import { ToolsContextProvider } from './helpers/toolsContext'
import { EntitiesContextProvider } from './entities/entitiesContext'
import PageMetaDebug from './pages/PageMetaDebug'
import themes from './theme/themes'
import mq from './theme/mq'

const themeIds = ['js', 'css', 'test']

const ThemedLayout = ({
    context,
    showPagination,
    showSidebar,
    toggleSidebar,
    closeSidebar,
    props
}) => {
    const sidebarClassName = showSidebar ? 'Sidebar--shown' : 'Sidebar--hidden'
    const [themeId, setThemeId] = useState('js')

    const switchTheme = useCallback(
        event => {
            if (event.code === 'KeyX') {
                setThemeId(current => {
                    const currentIndex = themeIds.findIndex(id => id === current)
                    if (currentIndex < themeIds.length - 1) {
                        return themeIds[currentIndex + 1]
                    }

                    return themeIds[0]
                })
            }
        },
        [setThemeId]
    )

    useEffect(() => {
        document.addEventListener('keypress', switchTheme)

        return () => {
            document.removeEventListener('keypress', switchTheme)
        }
    }, [switchTheme])

    return (
        <ThemeProvider theme={themes[themeId]}>
            <ToolsContextProvider survey={props.pageContext.survey}>
                <EntitiesContextProvider entities={props.pageContext.entities}>
                    <GlobalStyle />
                    <div
                        className={classNames('pageLayout', `PageLayout--${context.id}`, {
                            'PageLayout--sidebar': showSidebar,
                            'PageLayout--nosidebar': !showSidebar,
                            capture: context.isCapturing,
                            nocapture: !context.isCapturing
                        })}
                    >
                        <Head />
                        <div className="pagelayout__inner">
                            <Sidebar
                                {...props}
                                sidebarClassName={sidebarClassName}
                                showSidebar={showSidebar}
                                closeSidebar={closeSidebar}
                            />
                            <main className="pagelayout__content">
                                {showPagination && (
                                    <Pagination toggleSidebar={toggleSidebar} position="top" />
                                )}
                                <div className="pagelayout__main">
                                    <PageMetaDebug />
                                    {props.children}
                                </div>
                            </main>
                        </div>
                    </div>
                </EntitiesContextProvider>
            </ToolsContextProvider>
        </ThemeProvider>
    )
}

class Layout extends PureComponent {
    static propTypes = {
        showPagination: propTypes.bool.isRequired
    }

    static defaultProps = {
        showPagination: true
    }

    constructor() {
        super()
        this.state = {
            showSidebar: false
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

    closeSidebar = () => {
        this.setState({
            showSidebar: false
        })
    }

    render() {
        const { showPagination, location, pageContext, router } = this.props
        const { showSidebar } = this.state
        const context = mergePageContext(
            { ...pageContext, ...this.state, currentPath: router.asPath },
            location
        )

        return (
            <PageContextProvider value={context}>
                <I18nContextProvider translations={pageContext.translations}>
                    <ThemedLayout
                        context={context}
                        showPagination={showPagination}
                        showSidebar={showSidebar}
                        toggleSidebar={this.toggleSidebar}
                        closeSidebar={this.closeSidebar}
                        props={this.props}
                    />
                </I18nContextProvider>
            </PageContextProvider>
        )
    }
}

export default withRouter(Layout)

const GlobalStyle = createGlobalStyle`
    body {
        background: ${props => props.theme.colors.background};
        color: ${props => props.theme.colors.text};
        padding: 0;
        font-feature-settings: 'liga' 0;
        line-height: 1.7;
    }

    html {
    box-sizing: border-box;
    }

    *,
    *:before,
    *:after {
        box-sizing: inherit;
    }

    a {
        text-decoration: none;

        &,
        &:link,
        &:visited,
        &:active,
        &:focus {
            color: ${props => props.theme.colors.link};
        }

        &:hover {
            text-decoration: underline;
            color: ${props => props.theme.colors.linkHover};
        }
    }

    .ReactModal__Overlay {
        z-index: 1000;
    }

    .Page__Contents--awards {
        @media ${mq.mediumLarge} {
            display: grid;
            grid-template-columns: 1fr 1fr;
            column-gap: ${props => props.theme.spacing * 4}px;
            row-gap: ${props => props.theme.spacing * 4}px;

            .Page__Introduction {
                grid-column: 1 / 3;
            }
        }
    }
`
