import { TELAS } from './enum'

export function ConverteNotificacao(notificacao) {
  console.log(notificacao)
  if (notificacao.tela === TELAS.PERFILAVALIADO) {
    return {
      name: 'VisualizarPerfil',
      options: {
        idUsuario: notificacao.idUsuario,
      },
    }
  }
}
