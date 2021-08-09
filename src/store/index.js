import { createStore } from 'vuex'
import { auth } from './auth.js'

import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'

const store = createStore({
  modules: {
    auth
  },
  state: {
    versionDddragonLol: null
  },
  actions: {
    async initApp({ commit }) {
      const token = Cookies.get('trinket_token') || null
      if (token) {
        const token_decoded = jwt_decode(token)
        commit('auth/setUser', token_decoded.user)
      }

      const versionsDddragonLol = await fetch('https://ddragon.leagueoflegends.com/api/versions.json').then(r => r.json())
      commit('setVersionDddragonLol', versionsDddragonLol[0])
    }
  },
  mutations: {
    setVersionDddragonLol: (state, versionDddragonLol) => {
      state.versionDddragonLol = versionDddragonLol
    },
  },
})

export default store