import api from '../api'

export function cadastroEntrega(data) {
  return api.post('entrega/', data)
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

export function buscarContratacoesMotoboys() {
  return api.get(`/contratacao/motoboys/`)
}
