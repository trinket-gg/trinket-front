import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.scss'

// Windicss
import 'virtual:windi.css'

// Axios
import VueAxios from 'vue-axios'
import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:4000',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Vue i18n
import i18n from './plugins/vue-i18n'

// Router
import router from './router.js'

// Yup locale for translation with i18n
import './plugins/yup-locale.js'

const app = createApp(App)
app.use(router)
app.use(i18n)
app.use(VueAxios, axios).provide('axios', instance)
app.mount('#app')