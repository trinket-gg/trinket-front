import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import ViteComponents from 'vite-plugin-components'
import Pages from "vite-plugin-pages";

export default defineConfig({
  plugins: [
    vue(),
    Pages(),
    WindiCSS(),
    ViteComponents()
  ]
})
