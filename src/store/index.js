import { createStore } from 'vuex'
import { auth } from './auth.js'

import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'

const store = createStore({
  modules: {
    auth
  },
  actions: {
    async initApp({ commit }) {
      const token = Cookies.get('trinket_token') || null
      if (token) {
        const token_decoded = jwt_decode(token)
        commit('auth/setUser', token_decoded.user)
      }
    }
  }
})

export default store