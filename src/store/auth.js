import axios from '../plugins/axios-instance'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'

export const auth = {
  namespaced: true,
  state: {
    user: {}
  },
  actions: {
    login({ commit }, userCredentials) {
      return new Promise( async (resolve, reject) => {
        try {
          let response = await axios.post('/users/login', userCredentials)
          const token = response.data.res
          Cookies.set('trinket_token', `Bearer ${token}`)

          const token_decoded = jwt_decode(token)
          response = await axios.get(`/users/${token_decoded._id}`)
          const user = response.data.res
          
          commit('setUser', user)

          resolve()
        } catch (err) {
          reject()
        }
      })
    },

    logout({ commit }) {
      Cookies.remove('trinket_token')
      commit('logout')
    },
  },
  mutations: {
    setUser: (state, user) => {
      state.user = user
    },
    logout: (state) => {
      state.user = {}
    },
  },
  getters: {
    isAuthenticated(state) {
      return !!Object.keys(state.user).length
    }
  }
}