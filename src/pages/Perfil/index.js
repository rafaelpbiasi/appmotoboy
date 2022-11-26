import React, { useContext, useEffect, useState } from 'react'
import {
  ScreenScrollContainer,
  Row,
  Text,
  Column,
  Divisor,
} from '../../components/atoms'
import {
  Button,
  Card,
  Estrelas,
  Input,
  ModalImage,
} from '../../components/molecules'
import Toast from 'react-native-toast-message'
import Icon from 'react-native-vector-icons/Ionicons'
import { colors } from '../../styles/colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import AuthContext from '../../contexts/auth'
import {
  avaliacaoUsuarioLogado,
  perfilUsuarioLogado,
} from '../../services/usuario'
import { BASE_URL } from '../../api'

export function Perfil() {
  const [abrirModal, setAbrirModal] = useState(false)
  const navigation = useNavigation()
  const { signOut } = useContext(AuthContext)
  const [perfil, setPerfil] = useState([])
  const [avaliacao, setAvaliacao] = useState([])
  function handleNavigateRelatorio() {
    navigation.navigate('Relatorio')
  }

  async function buscar() {
    try {
      const usuarioLogado = JSON.parse(await AsyncStorage.getItem('usuario'))
      const response = await perfilUsuarioLogado(usuarioLogado.id)

      var responseAvaliacao = null

      if (response.status === 200) {
        setPerfil(response.data.data)

        responseAvaliacao = await avaliacaoUsuarioLogado(usuarioLogado.id)

        if (responseAvaliacao.status === 200) {
          setAvaliacao(responseAvaliacao.data.data)
        }

        if (responseAvaliacao.status === 404) {
          Toast.show({
            type: 'error',
            text1: 'Avaliação não encontrado',
            visibilityTime: 6000,
          })
        }
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
          <Text weight="bold">{perfil.nome}</Text>

          <Button onPress={sair} borderColor="green" bg="white" w="50" h="50">
            <Icon name="exit-outline" size={30} color={colors.green} />
          </Button>
        </Row>

        <Divisor mt="15" />

        <Row justify="flex-start" mt="20">
          {String(perfil.flagtipousuario).toLocaleUpperCase() === 'M' &&
            perfil.flagverificado === 'T' && (
              <>
                <Icon
                  name="md-shield-checkmark"
                  size={30}
                  color={colors.green}
                />
                <Text size="20">{' Perfil verificado'}</Text>
              </>
            )}
          {String(perfil.flagtipousuario).toLocaleUpperCase() === 'M' &&
            perfil.flagverificado === 'F' && (
              <>
                <Icon name="md-shield" size={30} color={colors.green} />
                <Text size="20">{' Perfil não verificado'}</Text>
              </>
            )}
        </Row>

        <Row justify="space-between" mt="10">
          {String(perfil.flagtipousuario).toLocaleUpperCase() === 'M' && (
            <Text size="20">{'Qtde entregas: ' + perfil.qtdEntrega}</Text>
          )}
          {String(perfil.flagtipousuario).toLocaleUpperCase() === 'M' && (
            <Button wp="48" h="40" w="90" onPress={handleNavigateRelatorio}>
              Relatório
            </Button>
          )}
        </Row>

        <Row justify="space-between" mt="10">
          <Text size="20" mr="5">
            {'Telefone: ' + perfil.telefone}
          </Text>
        </Row>

        <Row justify="space-between" mt="10">
          <Estrelas stars={perfil.mediaestrelas} />
        </Row>

        <Divisor mt="15" />

        <Row justify="space-between" mt="30">
          <Text size="30" mr="5">
            Comentários
          </Text>
        </Row>

        {avaliacao.map((item, key) => (
          <Card mt="30" key={key} align="left">
            <Text size="20" align="left" weight="bold">
              {item?.perfilavaliador?.nome}
            </Text>
            <Text size="20" align="left">
              {item?.comentario}
            </Text>
          </Card>
        ))}
      </Column>

      <ModalImage
        show={abrirModal}
        setShow={setAbrirModal}
        image={BASE_URL + perfil.fotocnh}
      />
    </ScreenScrollContainer>
  )
}
