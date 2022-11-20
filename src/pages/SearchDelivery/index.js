import React, { useEffect, useRef, useState } from 'react'
import {
  ScreenScrollContainer,
  Row,
  Text,
  Container,
  Divisor,
} from '../../components/atoms'
import { Button, Card, Input, RadioButton } from '../../components/molecules'
import { Validates } from '../../utils/validates'
import Toast from 'react-native-toast-message'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  buscarContratacoesEntregas,
  buscarContratacoesPorMotoboyValor,
  contratacaoMotoboy,
} from '../../services/entrega'
import { Mask } from '../../utils/mask'
import { FlatList, Linking, RefreshControl } from 'react-native'
import ModalAsync from '../../components/molecules/ModalAsync'

export function SearchDelivery({ navigation }) {
  const [refreshing, setRefreshing] = useState(false)
  const [contratacoesEntrega, setcontratacoesEntrega] = useState([])
  const [errors, setErrors] = useState({
    Nome: '',
  })
  const [value, setValue] = useState(null)

  const modalRef = useRef()

  function validate() {
    var valid = true
    return valid
  }

  function resetErrors() {}

  const abrirModalAceitar = (idContratacao) => {
    const modal = modalRef.current
    setTimeout(async () => {
      try {
        await modal.show()
        handleNavigateAceitarEntrega(idContratacao)
        modal.hide()
      } catch (err) {
        modal.hide()
        return
      }
    }, 100)
  }

  function handleNavigatePerfil(idUsuario) {
    navigation.navigate('VisualizarPerfil', {
      idUsuario,
    })
  }

  function handleAbrirGPS(data) {
    const endPointOrigem = `${data.ruaorigem}, ${data.numeroorigem}, ${data.bairroorigem}, ${data.cidade} - ${data.estado}`
    Linking.openURL(
      `https://www.google.com/maps/dir/?api=1&destination=${endPointOrigem}`
    )
  }

  async function handleNavigateAceitarEntrega(idContratacao) {
    if (validate()) {
      try {
        if (!validate()) return

        const usuarioLogado = JSON.parse(await AsyncStorage.getItem('usuario'))

        const dadosAtualizaContratacao = {
          idContratacao: idContratacao,
          status: 'I',
          idUsuario: usuarioLogado.id,
        }

        const response = await contratacaoMotoboy(dadosAtualizaContratacao)

        if (response.status === 200) {
          Toast.show({
            type: 'info',
            text1:
              'Entrega aceita com sucesso, você tem 30 minutos para buscar o produto e realizar a entrega',
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
      var response = null

      if (value === 0 || value === null) {
        response = await buscarContratacoesEntregas()
      } else {
        response = await buscarContratacoesPorMotoboyValor(value)
      }

      if (response.status === 200) {
        setcontratacoesEntrega(response.data.data)
      }

      if (response.status === 404) {
        Toast.show({
          type: 'error',
          text1: 'Entregas não encontradas',
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
  }, [])

  return (
    <Container align="center">
      <Text mt="80" size="35" weight="bold">
        Busca de Entregas
      </Text>

      <Row mt="10" justify="space-between">
        <Input
          label="Valor"
          placeholder="Digite um valor..."
          keyboardType="numeric"
          value={value}
          onChangeText={(text) => {
            resetErrors()
            setValue(Mask.MoedaMask(text))
          }}
          returnKeyType="done"
          onSubmitEditing={buscar}
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
        data={contratacoesEntrega}
        style={{
          width: '90%',
        }}
        renderItem={({ item }) => (
          <Card mt="20" wp="100">
            <Row justify="space-between" style={{ elevation: 10, zIndex: 10 }}>
              <Text size="20" mr="5">
                {item?.contratante?.nome}
              </Text>
              <Button
                wp="48"
                h="40"
                w="90"
                onPress={() => handleNavigatePerfil(item.contratante.id)}
              >
                Perfil
              </Button>
            </Row>
            <Row
              justify="space-between"
              mt="10"
              style={{ elevation: 10, zIndex: 10 }}
            >
              <Text size="20" mr="5" align="left">
                {'Origem: Rua: ' +
                  item?.entrega?.ruaorigem +
                  ', bairro: ' +
                  item?.entrega?.bairroorigem +
                  ', N° ' +
                  item?.entrega?.numeroorigem +
                  ', Referência: ' +
                  item?.entrega?.referenciaorigem}
              </Text>
            </Row>
            <Row
              justify="space-between"
              mt="10"
              style={{ elevation: 10, zIndex: 10 }}
            >
              <Text size="20" mr="5" align="left">
                {'Destino: Rua: ' +
                  item?.entrega?.ruadestino +
                  ', bairro: ' +
                  item?.entrega?.bairrodestino +
                  ', N°: ' +
                  item?.entrega?.numerodestino +
                  ', Referência: ' +
                  item?.entrega?.referenciadestino}
              </Text>
            </Row>

            <Row
              justify="space-between"
              mt="10"
              style={{ elevation: 10, zIndex: 10 }}
            >
              <Text size="20" mr="5" align="left">
                {'Valor: R$ ' + item?.entrega?.valor}
              </Text>
            </Row>

            <Row
              justify="space-between"
              mt="10"
              style={{ elevation: 10, zIndex: 10 }}
            >
              <Button
                wp="48"
                mt="20"
                bg="greenLight"
                borderColor="greenLight"
                onPress={() => handleAbrirGPS(item.entrega)}
              >
                Abrir GPS
              </Button>
              <Button
                wp="48"
                mt="20"
                bg="greenLight"
                borderColor="greenLight"
                onPress={() => abrirModalAceitar(item.id)}
              >
                Aceitar
              </Button>
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
          Deseja realmente aceitar essa entrega?
        </Text>
      </ModalAsync>
    </Container>
  )
}
