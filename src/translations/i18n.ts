import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import de from './de/index'
import en from './en/index'
import nl from './nl/index'
import ua from './ua/index'

const getInitialLanguage = () => {
  const lang = localStorage.getItem('currentLanguage')
  return lang ? JSON.parse(lang) : 'en'
}

const resources = {
  en,
  ua,
  nl,
  de
}

i18n.use(initReactI18next).init({
  resources,
  lng: getInitialLanguage()
})

export default i18n
