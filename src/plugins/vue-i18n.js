import { createI18n } from 'vue-i18n/index'
import fr from '../locales/fr.json'
import en from '../locales/en.json'

const messages = Object.assign({ fr, en })

export default createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'en',
  messages
})