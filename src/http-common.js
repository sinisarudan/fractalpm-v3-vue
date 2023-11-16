import axios from 'axios';
import config from '@/assets/config/config.json';
const env = config.env;
if (env === 'dev') {
  console.warn('[config::env [dev] ]', env);
} else {
  console.log('[config::env]', env);
}

/**
 * @type {string}
 */
const BASE_URL = config.api[env].base_url + ':' + config.api[env].port + '/api';

/**
 * @type {import('axios').AxiosInstance}
 */
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-type': 'application/json'
  }
});

console.log('baseURL', BASE_URL);

export default apiClient;
