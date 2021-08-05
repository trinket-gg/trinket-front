import { createStore } from 'vuex'
import { auth } from './auth.js'

import axios from '../plugins/axios-instance'
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
        const response = await axios.get(`/users/${token_decoded._id}`)
        const user = response.data.res
        commit('auth/setUser', user)
      }
    }
  }
})

export default store