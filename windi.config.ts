import { defineConfig } from 'vite-plugin-windicss'

export default defineConfig({
  attributify: true,
  theme: {
    extend: {
      colors: {
        'tkt-black': '#131825',
        'tkt-black-bg': '#1C212E',
        'tkt-black-bg-light': '#262A36',
        'tkt-black-bg-hover': '#334155',
        'tkt-primary': '#52DFFF',
        'tkt-text-primary': '#F8FAFC',
        'tkt-text-secondary': '#94A3B8',
      }
    }
  },
  plugins: [
    require('windicss/plugin/forms'),
    // ...
  ],
})