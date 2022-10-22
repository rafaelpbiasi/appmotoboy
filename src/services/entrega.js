import api from '../api'

export function cadastroEntrega(data) {
  return api.post('entrega/', data)
}

export function cadastroContratacao(data) {
  return api.post('contratacao/', data)
}

export function buscarContratacoesPorContratante(idContratante) {
  return api.get(`/contratacao/porContratante/${idContratante}`)
}

export function buscarContratacoesPorMotoboy(idMotoboy) {
  return api.get(`/contratacao/porMotoboy/${idMotoboy}`)
}

export function buscarContratacoesEntregas() {
  return api.get(`/contratacao/entregas/`)
}

export function buscarContratacoesEntregasStatus(idContratante, status) {
  return api.get(`/contratacao/entregas/${idContratante}/${status}`)
}

export function buscarContratacoesMotoboysStatus(idMotoboy, status) {
  return api.get(`/contratacao/motoboys/${idMotoboy}/${status}`)
}
