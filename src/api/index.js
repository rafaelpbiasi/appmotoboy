import axios from 'axios'

export const BASE_URL = 'http://192.168.0.132:8000/'

const api = axios.create({
  //baseURL: 'http://172.20.4.204:8000/',
  baseURL: BASE_URL,
  validateStatus: false,
})
export default api
