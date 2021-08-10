import axios from '../plugins/axios-instance'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'

export const auth = {
  namespaced: true,
  state: {
    user: {}
  },
  actions: {
    async login({ commit, disptach }, userCredentials) {
      try {
        const response = await axios.post('/users/login', userCredentials)
        const token = response.data.res
        Cookies.set('trinket_token', `Bearer ${token}`)

        const token_decoded = jwt_decode(token)
        const { data } = await axios.get(`/users/${token_decoded._id}`)
        commit('setUser', data.res)
      } catch (err) {
        disptach('logout')
      }
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
    },
    getUser(state) {
      return state.user
    }
  }
}