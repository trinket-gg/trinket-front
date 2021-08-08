import axios from 'axios'
import Cookies from 'js-cookie'
import store from '../store/index'

const instance = axios.create({
  baseURL: 'http://localhost:4000',
  timeout: 1000,
  headers: { 
    'Content-Type': 'application/json'
  }
})

instance.interceptors.request.use( function (config) {
  const token = Cookies.get('trinket_token')
  if (token) config.headers['Authorization'] = token

  return config;
}, function (error) {
  return Promise.reject(error);
})

// instance.interceptors.response.use(undefined, (err) => {
//   if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
//     store.dispatch('auth/logout')
//   }
// })

export default instance