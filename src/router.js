import Home from './pages/Home.vue'
import Signup from './pages/account/Signup.vue'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/signup',
    component: Signup
  }
]

import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  history: createWebHistory('/'),
  routes
});