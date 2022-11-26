import React, { useContext, useEffect, useRef, useState } from 'react'
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
import {
  avaliacaoUsuarioLogado,
  perfilUsuarioLogado,
} from '../../services/usuario'
import { BASE_URL } from '../../api'
import { cadastroAvaliacao } from '../../services/avaliacao'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import { GenericButton } from '../../components/molecules/Button/styles'
import { Linking } from 'react-native'
import ModalAvaliacao from '../../components/molecules/ModalAvaliacao'

export function VisualizarPerfil({ route, navigation }) {
  const [abrirModal, setAbrirModal] = useState(false)
  const [perfil, setPerfil] = useState([])
  const [idPerfil, setIdPerfil] = useState(null)
  const [comentario, setComentario] = useState(null)
  const [avaliacao, setAvaliacao] = useState([])
  const [apresentaComentario, setApresentaComentario] = useState([])
  const [estrelas, setEstrelas] = useState('0')
  const [abrirModalAvaliar, setAbrirModalAvaliar] = useState(false)

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
      setAbrirModalAvaliar(false)
      const usuarioLogado = JSON.parse(await AsyncStorage.getItem('usuario'))
      const dadosValiacao = {
        comentario: comentario,
        codperfilavaliador: usuarioLogado,
        codperfilavaliado: idPerfil,
        estrela: estrelas,
      }

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
    }
  }

  function handlerAbrirFone() {
    const telefone = String(perfil.telefone).replace(/\D/g, '')
    Linking.openURL(`whatsapp://send?phone=55${telefone}`)
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

        <Row justify="space-between" mt="20">
          {String(perfil.flagtipousuario).toLocaleUpperCase() === 'M' && (
            <Text size="20">{'Qtde entregas: ' + perfil.qtdEntrega}</Text>
          )}
        </Row>
        <Row justify="space-between" mt="10">
          <GenericButton onPress={handlerAbrirFone}>
            <Text size="20" mr="5">
              {'Telefone: ' + perfil.telefone}
            </Text>
          </GenericButton>
        </Row>

        <Row justify="space-between" mt="10">
          <Estrelas stars={perfil.mediaestrelas} />
        </Row>

        <Divisor mt="15" />

        <Button
          mt="20"
          onPress={() => {
            setAbrirModalAvaliar(true)
          }}
        >
          Avaliar
        </Button>

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

      <ModalAvaliacao
        open={abrirModalAvaliar}
        setOpen={setAbrirModalAvaliar}
        handleSubmit={inserirComentario}
      >
        <Input
          placeholder="Escreva um comentário..."
          value={comentario}
          onChangeText={(text) => {
            setComentario(text)
          }}
          returnKeyType="next"
        />

        <Text size="18">Qtd. Estrelas</Text>
        <Input
          wp="10"
          keyboardType="number-pad"
          maxLength={1}
          value={estrelas}
          onChangeText={(text) => {
            setEstrelas(text)
          }}
          returnKeyType="next"
          onSubmitEditing={inserirComentario}
        />
      </ModalAvaliacao>
    </ScreenScrollContainer>
  )
}
