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
import {
  avaliacaoUsuarioLogado,
  perfilUsuarioLogado,
} from '../../services/usuario'
import { BASE_URL } from '../../api'
import { cadastroAvaliacao } from '../../services/avaliacao'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createIconSetFromFontello } from 'react-native-vector-icons'

export function VisualizarPerfil({ route, navigation }) {
  const [abrirModal, setAbrirModal] = useState(false)
  const [perfil, setPerfil] = useState([])
  const [idPerfil, setIdPerfil] = useState(null)
  const [comentario, setComentario] = useState(null)
  const [avaliacao, setAvaliacao] = useState([])
  const [apresentaComentario, setApresentaComentario] = useState([])

  async function buscar(idUsuario) {
    try {
      setIdPerfil(idUsuario)
      const response = await perfilUsuarioLogado(idUsuario)

      if (response.status === 200) {
        setPerfil(response.data.data)

        responseAvaliacao = await avaliacaoUsuarioLogado(idUsuario)

        if (responseAvaliacao.status === 200) {
          setApresentaComentario(responseAvaliacao.data.data)
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
      console.log(error)
    }
  }

  useEffect(() => {
    if (route.params) {
      const { idUsuario } = route.params
      buscar(idUsuario)
    }
  }, [route])

  async function inserirComentario() {
    try {
      const usuarioLogado = JSON.parse(await AsyncStorage.getItem('usuario'))
      const dadosValiacao = {
        comentario: comentario,
        codperfilavaliador: usuarioLogado,
        codperfilavaliado: idPerfil,
      }

      console.log(dadosValiacao)

      const response = await cadastroAvaliacao(dadosValiacao)

      if (response.status === 201) {
        setAvaliacao(response.avaliacao)
        setComentario('')
        await buscar(idPerfil)
      }

      if (response.status === 404) {
        Toast.show({
          type: 'error',
          text1: 'Entregas não encontradas',
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

  return (
    <ScreenScrollContainer
      contentContainerStyle={{
        alignItems: 'center',
      }}
    >
      <Column wp="90" mt="50">
        <Row justify="space-between" wp="90" mt="10">
          <Text weight="bold">{perfil.nome}</Text>

          {String(perfil.flagtipousuario).toLocaleUpperCase() === 'M' && (
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
          )}
        </Row>

        <Divisor mt="15" />

        <Row justify="space-between" mt="20">
          {String(perfil.flagtipousuario).toLocaleUpperCase() === 'M' && (
            <Text size="20">{'Qtde entregas: ' + perfil.qtdEntrega}</Text>
          )}
        </Row>
        <Row justify="space-between" mt="10">
          <Text size="20" mr="5">
            {'Telefone: ' + perfil.telefone}
          </Text>
        </Row>

        <Divisor mt="15" />

        <Row justify="space-between" style={{ elevation: 10, zIndex: 10 }}>
          <Input
            placeholder="Escreva um comentário..."
            value={comentario}
            onChangeText={(text) => {
              setComentario(text)
            }}
            returnKeyType="next"
            onSubmitEditing={inserirComentario}
          />
        </Row>

        <Row justify="space-between" mt="20">
          <Text size="30" mr="5">
            Comentários
          </Text>
        </Row>

        {apresentaComentario.map((item, key) => (
          <Card mt="30" key={key} align="left">
            <Text size="20" align="left" weight="bold">
              {item?.perfilavaliador?.nome}
            </Text>
            <Divisor />
            <Text size="20" align="left" mt="10">
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
