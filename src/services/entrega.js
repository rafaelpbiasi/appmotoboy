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

export function buscarContratacoesPorMotoboyValor(valor) {
  return api.get(`/contratacao/entregas/${valor}`)
}

export function buscarContratacoesEntregasStatus(idContratante, status) {
  return api.get(`/contratacao/entregas/${idContratante}/${status}`)
}

export function buscarContratacoesMotoboysStatus(idMotoboy, status) {
  return api.get(`/contratacao/motoboys/${idMotoboy}/${status}`)
}

export function contratacaoMotoboy(dadosAtualizaContratacao) {
  return api.patch(`/contratacao/atualizacontratacao`, dadosAtualizaContratacao)
}

export function deletaEntrega(idContratacao) {
  return api.delete(`/contratacao/deletacontratacao/${idContratacao}`)
}
