import React, { createContext, useContext } from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { getTranslator } from './translator'
import { usePageContext } from '../helpers/pageContext'

export const I18nContext = createContext()

const translationsQuery = graphql`
    query {
        translations: allTranslationsYaml {
            edges {
                node {
                    locale
                    translations {
                        key
                        t
                    }
                }
            }
        }
    }
`

export const I18nContextProvider = ({ children }) => {
    const context = usePageContext()

    return (
        <StaticQuery query={translationsQuery}>
            {({ translations: _translations }) => {
                const translations = _translations.edges.map(t => t.node)
                const catalogue = translations.find(t => t.locale === context.locale)
                if (!context.locale) {
                    throw new Error(`No locale defined in context`)
                }
                if (!catalogue) {
                    throw new Error(
                        `Could not find catalogue for locale ${
                            context.locale
                        }. Available locales: ${translations.map(t => t.locale).join(', ')}`
                    )
                }
                const translate = getTranslator(catalogue)

                return (
                    <I18nContext.Provider value={{ translate, catalogue }}>
                        {children}
                    </I18nContext.Provider>
                )
            }}
        </StaticQuery>
    )
}

export const useI18n = () => useContext(I18nContext)
