import React, { useContext, useEffect, useState } from 'react'
import {
  ScreenScrollContainer,
  Row,
  Text,
  Column,
  Divisor,
} from '../../components/atoms'
import { Button, Card, Input, ModalImage } from '../../components/molecules'
import Toast from 'react-native-toast-message'
import Icon from 'react-native-vector-icons/Ionicons'
import { colors } from '../../styles/colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import AuthContext from '../../contexts/auth'
import { perfilUsuarioLogado } from '../../services/usuario'
import { BASE_URL } from '../../api'

export function Perfil() {
  const [abrirModal, setAbrirModal] = useState(false)
  const navigation = useNavigation()
  const { signOut } = useContext(AuthContext)
  const [perfil, setPerfil] = useState([])
  function handleNavigateRelatorio() {
    navigation.navigate('Relatorio')
  }

  async function buscar() {
    try {
      const usuarioLogado = JSON.parse(await AsyncStorage.getItem('usuario'))
      console.log(usuarioLogado)
      const response = await perfilUsuarioLogado(usuarioLogado.id)

      if (response.status === 200) {
        setPerfil(response.data.data)
      }

      if (response.status === 404) {
        Toast.show({
          type: 'error',
          text1: 'Perfil não encontrado',
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

  const sair = async () => {
    await signOut()
  }

  return (
    <ScreenScrollContainer
      contentContainerStyle={{
        alignItems: 'center',
      }}
    >
      <Column wp="90" mt="50">
        <Row justify="space-between" wp="90" mt="10">
          <Text>{perfil.nome}</Text>

          <Button
            onPress={() => {
              if (perfil?.fotocnh) {
                setAbrirModal(true)
              }
            }}
            borderColor="green"
            bg="white"
            w="40"
            h="40"
          >
            <Icon name="documents" size={30} color={colors.green} />
          </Button>

          <Button onPress={sair} borderColor="green" bg="white" w="40" h="40">
            <Icon name="exit-outline" size={30} color={colors.green} />
          </Button>
        </Row>

        <Row justify="space-between" mt="40">
          <Text size="20">Avaliação</Text>

          <Button wp="48" h="40" w="90" onPress={handleNavigateRelatorio}>
            Relatório
          </Button>
        </Row>
        <Row justify="space-between" mt="10">
          <Text size="20" mr="5">
            {'Telefone: ' + perfil.telefone}
          </Text>
        </Row>

        <Divisor mt="15" />

        <Row justify="space-between" style={{ elevation: 10, zIndex: 10 }}>
          <Input placeholder="Escreva um comentário..." />
        </Row>

        <Row justify="space-between" mt="30">
          <Text size="30" mr="5">
            Comentários
          </Text>
        </Row>

        <Card mt="30">
          <Row justify="space-between" style={{ elevation: 10, zIndex: 10 }}>
            <Text size="15" mr="5">
              Nome do avaliador
            </Text>
          </Row>
        </Card>
      </Column>

      <ModalImage
        show={abrirModal}
        setShow={setAbrirModal}
        image={BASE_URL + perfil.fotocnh}
      />
    </ScreenScrollContainer>
  )
}
