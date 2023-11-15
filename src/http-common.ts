import axios, { type AxiosInstance } from 'axios'
import config from '../public/config/config.json'
const env: string = config.env
if (env === 'dev') {
  console.warn('[config::env]', env)
} else {
  console.log('[config::env]', env)
}
const BASE_URL = config.api[env].base_url + ':' + config.api[env].port + '/api'
const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-type': 'application/json'
  }
})
console.log('baseURL', BASE_URL)
export default apiClient
