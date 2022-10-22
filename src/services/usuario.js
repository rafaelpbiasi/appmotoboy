import api from '../api'

export function login(data) {
  return api.post('usuario/login', data)
}

export function cadastroUsuario(data) {
  return api.post('usuario/', data)
}

export function buscarContratacoesMotoboys() {
  return api.get(`/usuario/motoboys/`)
}

export function buscarContratacoesMotoboysVeiculo(veiculo) {
  return api.get(`/usuario/motoboys/veiculo/${veiculo}`)
}
