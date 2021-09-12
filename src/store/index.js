import { createStore } from 'vuex'
import { auth } from './auth.js'

import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'
import axios from '../plugins/axios-instance'

const store = createStore({
  modules: {
    auth
  },
  state: {
    versionDddragonLol: null
  },
  actions: {
    async initApp({ commit, dispatch }) {
      const token = Cookies.get('trinket_token') || null
      if (token) {
        const token_decoded = jwt_decode(token)
        try {
          const { data } = await axios.get(`/users/${token_decoded._id}`)
          commit('auth/setUser', data.res)
        } catch (err) {
          dispatch('auth/logout')
        }
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
  getters: {
    getProfileIcon: (state) => {
      if (state.versionDddragonLol && state.auth.user?.riot_summoner?.profileIconId) {
        return `https://ddragon.leagueoflegends.com/cdn/${state.versionDddragonLol}/img/profileicon/${state.auth.user.riot_summoner.profileIconId}.png`
      } else {
        return '/loading_bg.png'
      }
    }
  }
})

export default store