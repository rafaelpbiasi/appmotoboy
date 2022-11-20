import axios from 'axios'

export const BASE_URL = 'http://192.168.0.132:8000/'

const api = axios.create({
  baseURL: BASE_URL,
  validateStatus: false,
})
export default api
