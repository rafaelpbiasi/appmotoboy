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

export function perfilUsuarioLogado(idUsuario) {
  return api.get(`/usuario/perfil/${idUsuario}`)
}

export function avaliacaoUsuarioLogado(idUsuario) {
  return api.get(`/usuario/perfil/avaliacao/${idUsuario}`)
}

export function relatorioUsuarioLogado(idUsuario) {
  return api.get(`/usuario/relatorio/${idUsuario}`)
}
