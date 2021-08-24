import { createI18n } from 'vue-i18n/index'
import messages from '@intlify/vite-plugin-vue-i18n/messages'

export default createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'en',
  messages
})