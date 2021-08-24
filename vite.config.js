import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import ViteComponents from 'vite-plugin-components'
import Pages from "vite-plugin-pages"
import viteSvgIcons from 'vite-plugin-svg-icons'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      include: [
        /\.vue\??/, // .vue
      ],
      imports: [
        'vue',
        'vue-router',
        'vue-i18n',
        { 'vuex': ['useStore'] },
        { 'vee-validate': ['useField', 'useForm'] }
      ],
    }),
    Pages(),
    WindiCSS(),
    ViteComponents(),
    viteSvgIcons({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      symbolId: 'icon-[dir]-[name]',
    })
  ],
  server: {
    cors: false
  }
})
