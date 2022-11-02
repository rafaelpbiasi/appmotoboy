import React, { useEffect, useState } from 'react'
import { ScreenScrollContainer, Text } from '../../components/atoms'
import Toast from 'react-native-toast-message'
import { relatorioUsuarioLogado } from '../../services/usuario'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Card } from '../../components/molecules'

export function Relatorio({}) {
  const [relatorio, setRelatorio] = useState([])

  async function buscar() {
    try {
      const usuarioLogado = JSON.parse(await AsyncStorage.getItem('usuario'))
      const response = await relatorioUsuarioLogado(usuarioLogado.id)

      if (response.status === 200) {
        setRelatorio(response.data.data)
      }

      if (response.status === 404) {
        Toast.show({
          type: 'error',
          text1: 'Relatório não encontrado',
          visibilityTime: 6000,
        })
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro inesperado',
        visibilityTime: 6000,
      })
      console.log(error)
    }
  }

  useEffect(() => {
    buscar()
  }, [])

  function buscaDescrStatus(status) {
    var descriStatus = ''

    if (status === 'P') {
      descriStatus = 'Pendente'
    } else if (status === 'I') {
      descriStatus = 'Iniciada'
    } else if (status === 'F') {
      descriStatus = 'Finalizada'
    } else if (status === 'S') {
      descriStatus = 'Solicitada'
    }

    return descriStatus
  }

  return (
    <ScreenScrollContainer
      contentContainerStyle={{
        alignItems: 'center',
      }}
    >
      <Text mt="80" size="35" weight="bold">
        Relatório
      </Text>

      {relatorio.map((item, key) => (
        <Card mt="30" key={key} align="left">
          <Text size="20" mr="5" mt="10" align="left">
            {'Nome contratante: ' + item.contratante.nome}
          </Text>

          <Text size="20" mr="5" mt="10" align="left">
            {'Origem: Rua: ' +
              item?.entrega?.ruaorigem +
              ', bairro: ' +
              item?.entrega?.bairroorigem +
              ', N° ' +
              item?.entrega?.numeroorigem}
          </Text>

          <Text size="20" mr="5" mt="10" align="left">
            {'Destino: Rua: ' +
              item?.entrega?.ruadestino +
              ', bairro: ' +
              item?.entrega?.bairrodestino +
              ', N°: ' +
              item?.entrega?.numerodestino}
          </Text>

          <Text size="20" mr="5" mt="10" align="left">
            {'Status: ' + buscaDescrStatus(item.status)}
          </Text>

          <Text size="20" mr="5" mt="10" align="left">
            {item.entrega.valor === null
              ? 'Valor não informado'
              : 'Valor: ' + item.entrega.valor}
          </Text>
        </Card>
      ))}
    </ScreenScrollContainer>
  )
}
