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

export function buscarContratacoesEntregasStatus(idContratante, status) {
  return api.get(`/contratacao/entregas/${idContratante}/${status}`)
}

export function buscarContratacoesMotoboysStatus(idMotoboy, status) {
  return api.get(`/contratacao/motoboys/${idMotoboy}/${status}`)
}

export function buscarContratacoesMotoboysVeiculo(veiculo) {
  return api.get(`/contratacao/motoboys/veiculo/${veiculo}`)
}
