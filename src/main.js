import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/main.scss'
import 'virtual:windi.css' // Windicss
import i18n from './plugins/vue-i18n' // Vue i18n
import './plugins/yup-locale.js' // Yup locale for translation with i18n
import 'virtual:svg-icons-register';

// Axios
import VueAxios from 'vue-axios'
import axios from 'axios'
import instance from './plugins/axios-instance'

// Router
import { createRouter, createWebHistory } from 'vue-router'
import routes from "virtual:generated-pages";
const router = createRouter({ history: createWebHistory('/'), routes })

// Store
import store from './store/index'

createApp(App)
  .use(router)
  .use(store)
  .use(i18n)
  .use(VueAxios, axios).provide('axios', instance)
  .mount('#app')