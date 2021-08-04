import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.scss'
import 'virtual:windi.css' // Windicss
import i18n from './plugins/vue-i18n' // Vue i18n
import './plugins/yup-locale.js' // Yup locale for translation with i18n

// Axios
import VueAxios from 'vue-axios'
import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:4000',
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' }
});

// Router
import { createRouter, createWebHistory } from 'vue-router'
import routes from "virtual:generated-pages";
const router = createRouter({ history: createWebHistory('/'), routes })


const app = createApp(App)
app.use(router)
app.use(i18n)
app.use(VueAxios, axios).provide('axios', instance)
app.mount('#app')