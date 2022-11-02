import axios from 'axios'

export const BASE_URL = 'http://192.168.0.132:8000/'
//export const BASE_URL = 'http://192.168.0.105:8000/'

const api = axios.create({
  //baseURL: 'http://192.168.0.105:8000/',
  baseURL: BASE_URL,
  validateStatus: false,
})
export default api
