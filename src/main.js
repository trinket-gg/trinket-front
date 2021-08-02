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

// Router
import router from './router.js'

const app = createApp(App)
app.use(router)
app.use(VueAxios, axios).provide('axios', instance)
app.mount('#app')
