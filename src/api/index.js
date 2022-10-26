import axios from 'axios'

const api = axios.create({
  baseURL: 'http://192.168.0.106:8000/',
  //baseURL: 'http://192.168.0.129:8000/',
  validateStatus: false,
})
export default api
