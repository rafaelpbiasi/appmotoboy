import api from '../api'

export function cadastroEntrega(data) {
  return api.post('entrega/', data)
}

export function buscarContratacoesPorContratante(idContratante) {
  return api.get(`/contratacao/porContratante/${idContratante}`)
}
