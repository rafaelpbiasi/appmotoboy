import api from '../api'

export function login(data) {
  return api.post('usuario/login', data)
}

export function cadastroUsuario(data) {
  return api.post('usuario/', data)
}
