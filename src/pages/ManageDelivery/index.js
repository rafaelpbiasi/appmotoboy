import React, { useEffect, useState } from 'react'
import {
  ScreenScrollContainer,
  Row,
  Text,
  Container,
} from '../../components/atoms'
import { Button, Input, RadioButton, Card } from '../../components/molecules'
import DropDownPicker from 'react-native-dropdown-picker'
import { colors } from '../../styles/colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-toast-message'
import {
  buscarContratacoesEntregasStatus,
  buscarContratacoesPorContratante,
} from '../../services/entrega'
import { FlatList, RefreshControl } from 'react-native'

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

  function validate() {
    var valid = true
    return valid
  }

  function handleNavigatePerfil(idUsuario) {
    navigation.navigate('VisualizarPerfil', {
      idUsuario,
    })
  }

  async function buscar() {
    try {
      console.log(value)
      const usuarioLogado = JSON.parse(await AsyncStorage.getItem('usuario'))
      var response = null

      if (value === 'T') {
        console.log('entrou')
        response = await buscarContratacoesPorContratante(usuarioLogado.id)
      } else {
        console.log('nao entrou')
        response = await buscarContratacoesEntregasStatus(
          usuarioLogado.id,
          value
        )
      }

      console.log(response.status)
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
      console.log(error)
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
              <Button
                wp="48"
                h="40"
                w="90"
                onPress={() => handleNavigatePerfil(item.contratado.id)}
              >
                Perfil
              </Button>
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
                <Button wp="48" h="40" w="90" bg="red" borderColor="red">
                  Cancelar
                </Button>
              )}
              {item.status === 'S' && (
                <Button wp="48" h="40" w="90" bg="red" borderColor="red">
                  Cancelar
                </Button>
              )}
            </Row>
          </Card>
        )}
        ListEmptyComponent={() => <Text>Nenhuma entrega encontrada!</Text>}
        keyExtractor={(item) => item.id}
      />
    </Container>
  )
}
