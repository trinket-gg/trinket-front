import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import Components from 'unplugin-vue-components/vite'
import { HeadlessUiResolver } from 'unplugin-vue-components/resolvers'
import Pages from "vite-plugin-pages"
import viteSvgIcons from 'vite-plugin-svg-icons'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import ViteFonts from 'vite-plugin-fonts'
import vueI18n from '@intlify/vite-plugin-vue-i18n'

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
    Components({
      resolvers: [HeadlessUiResolver()],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
    }),
    viteSvgIcons({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      symbolId: 'icon-[dir]-[name]',
    }),
    ViteFonts({
      google: {
        families: [{ 
          name: 'Poppins', 
          styles: 'ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900' 
        }]
      },
    }),
    vueI18n({
      include: path.resolve(__dirname, 'src/i18n/translations/**'),
      runtimeOnly: false
    })
  ],
  server: {
    cors: false
  }
})
