import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.scss'

// Windicss
import 'virtual:windi.css'

// Axios
import VueAxios from 'vue-axios'
import axios from 'axios'

// Router
import router from './router.js'

const app = createApp(App)
app.use(router)
app.use(VueAxios, axios).provide('axios', app.config.globalProperties.axios)
app.mount('#app')
