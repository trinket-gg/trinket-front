import Home from './pages/Home.vue'

const routes = [
  {
    path: '/',
    component: Home
  }
]

import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  history: createWebHistory('/'),
  routes
});