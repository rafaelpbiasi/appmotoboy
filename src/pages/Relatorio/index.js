import React, { useEffect, useState } from 'react'
import {
  ScreenScrollContainer,
  Row,
  Text,
  Column,
} from '../../components/atoms'
import Toast from 'react-native-toast-message'
import { relatorioUsuarioLogado } from '../../services/usuario'
import AsyncStorage from '@react-native-async-storage/async-storage'

export function Relatorio({ navigation }) {
  const [relatorio, setRelatorio] = useState([])

  async function buscar() {
    try {
      const usuarioLogado = JSON.parse(await AsyncStorage.getItem('usuario'))
      console.log(usuarioLogado)
      const response = await relatorioUsuarioLogado(usuarioLogado.id)
      console.log(response)

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

  return (
    <ScreenScrollContainer
      contentContainerStyle={{
        alignItems: 'center',
      }}
    >
      {relatorio.map((item, key) => (
        <Column key={key} align="center">
          <Text mt="80" size="35" weight="bold">
            Relatório
          </Text>
        </Column>
      ))}
    </ScreenScrollContainer>
  )
}
