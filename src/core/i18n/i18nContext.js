import { createContext, useContext } from 'react'
import { getTranslator } from './translator'

export const I18nContext = createContext()

export const I18nContextProvider = ({ translations, children }) => {
    const translate = getTranslator(translations)
    return <I18nContext.Provider value={{ translate, catalogue }}>{children}</I18nContext.Provider>
}

export const useI18n = () => useContext(I18nContext)
