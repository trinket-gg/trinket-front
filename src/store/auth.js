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
          const response = await axios.post('/users/login', userCredentials)
          const token = response.data.res
          Cookies.set('trinket_token', token)

          const token_decoded = jwt_decode(token)
          const request = await axios.get(`/users/${token_decoded._id}`)
          const user = request.data.res
          commit('authSuccess', user)

          resolve('success')
        } catch (err) {
          reject('error')
        }
      })
    },

    logout({ commit }) {
      Cookies.remove('trinket_token')
      commit('logout')
    }
  },
  mutations: {
    authSuccess: (state, user) => {
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