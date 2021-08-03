import { createI18n } from 'vue-i18n'
import { useLocalStorage } from '@vueuse/core'
import fr from '../languages/fr.js'
import en from '../languages/en.js'

const messages = {
  fr,
  en 
}

export default createI18n({
  legacy: false,
  globalInjection: true,
  locale: useLocalStorage('trinket-language'),
  fallbackLocale: 'fr',
  messages
})