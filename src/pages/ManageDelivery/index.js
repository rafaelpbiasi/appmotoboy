import React, { useEffect, useRef, useState } from 'react'
import {
  ScreenScrollContainer,
  Row,
  Text,
  Container,
  Column,
} from '../../components/atoms'
import { Button, Input, RadioButton, Card } from '../../components/molecules'
import DropDownPicker from 'react-native-dropdown-picker'
import { colors } from '../../styles/colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-toast-message'
import {
  buscarContratacoesEntregasStatus,
  buscarContratacoesPorContratante,
  deletaEntrega,
} from '../../services/entrega'
import { FlatList, RefreshControl } from 'react-native'
import ModalAsync from '../../components/molecules/ModalAsync'

export function ManageDelivery({ navigation }) {
  const [refreshing, setRefreshing] = useState(false)
  const [contratacoes, setContratacoes] = useState([])
  const [errors, setErrors] = useState({
    Nome: '',
  })
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('T')
  const [items, setItems] = useState([
    { label: 'Todas', value: 'T' },
    { label: 'Pendente', value: 'P' },
    { label: 'Iniciada', value: 'I' },
    { label: 'Finalizada', value: 'F' },
    { label: 'Solicitada', value: 'S' },
  ])

  const modalRef = useRef()

  function validate() {
    var valid = true
    return valid
  }

  function handleNavigatePerfil(idUsuario) {
    navigation.navigate('VisualizarPerfil', {
      idUsuario,
    })
  }

  const abrirModalCancelar = (idContratacao) => {
    const modal = modalRef.current
    setTimeout(async () => {
      try {
        await modal.show()
        handleNavigateCancelarEntrega(idContratacao)
        modal.hide()
      } catch (err) {
        modal.hide()
        return
      }
    }, 100)
  }

  async function handleNavigateCancelarEntrega(idContratacao) {
    if (validate()) {
      try {
        if (!validate()) return

        const response = await deletaEntrega(idContratacao)

        if (response.status === 202) {
          Toast.show({
            type: 'info',
            text1: 'Entrega cancelada com sucesso',
            visibilityTime: 6000,
          })
          await buscar()
        }

        if (response.status === 400) {
          Toast.show({
            type: 'info',
            text1: 'Erro',
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
  }

  async function buscar() {
    try {
      const usuarioLogado = JSON.parse(await AsyncStorage.getItem('usuario'))
      var response = null

      if (value === 'T') {
        response = await buscarContratacoesPorContratante(usuarioLogado.id)
      } else {
        response = await buscarContratacoesEntregasStatus(
          usuarioLogado.id,
          value
        )
      }

      if (response.status === 200) {
        setContratacoes(response.data.data)
      }

      if (response.status === 404) {
        Toast.show({
          type: 'error',
          text1: 'Usuario nao encontrado',
          visibilityTime: 6000,
        })
      }
      setRefreshing(false)
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro inesperado',
        visibilityTime: 6000,
      })
      setRefreshing(false)
    }
  }

  useEffect(() => {
    buscar()
  }, [value])

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
    <Container align="center">
      <Text mt="80" size="35" weight="bold">
        Gerenciar Entregas
      </Text>

      <Row
        wp="90"
        mt="10"
        justify="space-between"
        style={{ elevation: 10, zIndex: 10 }}
      >
        <Text size="20" mr="5">
          Status
        </Text>
        <DropDownPicker
          //Aqui da o erro, porque está abrindo um scrollView dentro do outro
          style={{
            borderColor: colors.greenDark,
          }}
          textStyle={{
            color: colors.greenDark,
          }}
          containerStyle={{
            width: '80%',
          }}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
      </Row>

      <FlatList
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true)
              buscar()
            }}
          />
        }
        data={contratacoes}
        style={{
          width: '90%',
        }}
        renderItem={({ item }) => (
          <Card mt="30" wp="100">
            <Row justify="space-between" style={{ elevation: 10, zIndex: 10 }}>
              <Text size="20" mr="5">
                {item.status === 'P'
                  ? 'entrega não aceita'
                  : item?.contratado?.nome}
              </Text>
              {item.status === 'I' && (
                <Button
                  wp="48"
                  h="40"
                  w="90"
                  onPress={() => handleNavigatePerfil(item?.contratado?.id)}
                >
                  Perfil
                </Button>
              )}
              {item.status === 'F' && (
                <Button
                  wp="48"
                  h="40"
                  w="90"
                  onPress={() => handleNavigatePerfil(item?.contratado?.id)}
                >
                  Perfil
                </Button>
              )}
              {item.status === 'S' && (
                <Button
                  wp="48"
                  h="40"
                  w="90"
                  onPress={() => handleNavigatePerfil(item?.contratado?.id)}
                >
                  Perfil
                </Button>
              )}
            </Row>
            <Row
              justify="space-between"
              mt="10"
              style={{ elevation: 10, zIndex: 10 }}
            >
              <Text size="20" mr="5">
                Status: {buscaDescrStatus(item.status)}
              </Text>

              {item.status === 'P' && (
                <Button
                  wp="48"
                  h="40"
                  w="100"
                  bg="red"
                  borderColor="red"
                  onPress={() => abrirModalCancelar(item.id)}
                >
                  Cancelar
                </Button>
              )}
              {item.status === 'S' && (
                <Button
                  wp="48"
                  h="40"
                  w="90"
                  bg="red"
                  p="5"
                  borderColor="red"
                  onPress={() => abrirModalCancelar(item.id)}
                >
                  Cancelar
                </Button>
              )}
            </Row>
          </Card>
        )}
        ListEmptyComponent={() => (
          <Text mt="20">Nenhuma entrega encontrada!</Text>
        )}
        keyExtractor={(item) => item.id}
      />
      <ModalAsync ref={modalRef}>
        <Text align="left" size={18} weight="bold" mb="20">
          Deseja realmente cancelar essa entrega?
        </Text>
      </ModalAsync>
    </Container>
  )
}
