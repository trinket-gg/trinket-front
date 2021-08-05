import axios from '../plugins/axios-instance'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'

const getUser = async (user_id) => {
  const request = await axios.get(`/users/${user_id}`)
  return request.data.res
}

const initUser = async () => {
  const token = Cookies.get('trinket_token')
  if (token) {
    const token_decoded = jwt_decode(token)
    return await getUser(token_decoded._id)
  }
}

export const auth = {
  namespaced: true,
  state: {
    user: await initUser() || {}
  },
  actions: {
    login({ commit }, userCredentials) {
      return new Promise( async (resolve, reject) => {
        try {
          const response = await axios.post('/users/login', userCredentials)
          const token = response.data.res
          Cookies.set('trinket_token', `Bearer ${token}`)
          const token_decoded = jwt_decode(token)
          const user = await getUser(token_decoded._id)
          
          commit('authSuccess', user)

          resolve()
        } catch (err) {
          reject()
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