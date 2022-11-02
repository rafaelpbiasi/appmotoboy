import api from '../api'

export function cadastroAvaliacao(data) {
  return api.post('avaliacao/', data)
}
