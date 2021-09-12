import { createRouter, createWebHistory } from 'vue-router'
import routes from "virtual:generated-pages";

import store from '../store/index'

const router = createRouter({ 
  history: createWebHistory('/'), 
  routes 
})

router.beforeEach( async (to, from, next) => {
  if (!from.name && !from.href) await store.dispatch('initApp')

  next()
})

export default router