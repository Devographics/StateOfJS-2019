import enUS from '../translations/en-US.yml'
import hiIN from '../translations/hi-IN.yml'
import itIT from '../translations/it-IT.yml'
import koKR from '../translations/ko-KR.yml'
import ptBR from '../translations/pt-BR.yml'
import ruRU from '../translations/ru-RU.yml'
import zhHans from '../translations/zh-Hans.yml'

const translations = {
    [enUS.locale]: enUS,
    [hiIN.locale]: hiIN,
    [itIT.locale]: itIT,
    [koKR.locale]: koKR,
    [ptBR.locale]: ptBR,
    [ruRU.locale]: ruRU,
    [zhHans.locale]: zhHans
}

export default function getTranslationsByLocale(locale) {
    return translations[locale]
}
