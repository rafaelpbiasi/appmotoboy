import React, { useEffect, useRef, useState } from 'react'
import {
  ScreenScrollContainer,
  Row,
  Text,
  Container,
} from '../../components/atoms'
import { Button, Card, Input, RadioButton } from '../../components/molecules'
import DropDownPicker from 'react-native-dropdown-picker'
import { colors } from '../../styles/colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-toast-message'
import {
  buscarContratacoesMotoboysStatus,
  buscarContratacoesPorMotoboy,
  contratacaoMotoboy,
} from '../../services/entrega'
import { FlatList, Linking, RefreshControl } from 'react-native'
import ModalAsync from '../../components/molecules/ModalAsync'

export function YourDelivery({ navigation }) {
  const [refreshing, setRefreshing] = useState(false)
  const [contratacoesMotoboy, setcontratacoesMotoboy] = useState([])
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
  const modalRef2 = useRef()

  function validate() {
    var valid = true
    return valid
  }

  const abrirModalAceitar = (idContratacao, idContratado, status) => {
    const modal = modalRef.current
    setTimeout(async () => {
      try {
        await modal.show()
        handleNavigateFinalizarEntrega(idContratacao, idContratado, status)
        modal.hide()
      } catch (err) {
        modal.hide()
        return
      }
    }, 100)
  }

  const abrirModalFinalizar = (idContratacao, idContratado, status) => {
    const modal = modalRef2.current
    setTimeout(async () => {
      try {
        await modal.show()
        handleNavigateFinalizarEntrega(idContratacao, idContratado, status)
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
    const endPointDestino = `${data.ruadestino}, ${data.numerodestino}, ${data.bairrodestino}, ${data.cidade} - ${data.estado}`
    Linking.openURL(
      `https://www.google.com/maps/dir/?api=1&origin=${endPointOrigem}&destination=${endPointDestino}`
    )
  }

  async function handleNavigateFinalizarEntrega(
    idContratacao,
    idContratado,
    status
  ) {
    if (validate()) {
      try {
        if (!validate()) return

        const dadosAtualizaContratacao = {
          idContratacao: idContratacao,
          status: status,
          idContratado: idContratado,
        }

        const response = await contratacaoMotoboy(dadosAtualizaContratacao)

        if (response.status === 201) {
          Toast.show({
            type: 'info',
            text1: 'Entrega finalizada com sucesso',
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
        response = await buscarContratacoesPorMotoboy(usuarioLogado.id)
      } else {
        response = await buscarContratacoesMotoboysStatus(
          usuarioLogado.id,
          value
        )
      }

      if (response.status === 200) {
        setcontratacoesMotoboy(response.data.data)
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

  return (
    <Container align="center">
      <Text mt="80" size="35" weight="bold">
        Suas entregas
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
        data={contratacoesMotoboy}
        style={{
          width: '90%',
        }}
        renderItem={({ item }) => (
          <Card mt="30" wp="100">
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
                  item?.entrega?.numeroorigem}
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
                  item?.entrega?.numerodestino}
              </Text>
            </Row>

            {!!item.entrega.observacao && (
              <Row
                justify="space-between"
                mt="10"
                style={{ elevation: 10, zIndex: 10 }}
              >
                <Text size="20" mr="5" align="left">
                  {'Observação: ' + item.entrega.observacao}
                </Text>
              </Row>
            )}

            <Row
              justify="space-between"
              mt="10"
              style={{ elevation: 10, zIndex: 10 }}
            >
              {item.status === 'S' && (
                <>
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
                    onPress={() =>
                      abrirModalAceitar(item.id, item.contratado.id, 'I')
                    }
                  >
                    Aceitar
                  </Button>
                </>
              )}
              {item.status === 'P' ||
                (item.status === 'I' && (
                  <>
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
                      onPress={() =>
                        abrirModalFinalizar(item.id, item.contratado.id, 'F')
                      }
                    >
                      Finalizar
                    </Button>
                  </>
                ))}
              {item.status === 'F' && (
                <>
                  <Text ml="20" size={30} weight="bold" mt="10">
                    Entrega Finalizada
                  </Text>
                </>
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
          Deseja realmente aceitar essa entrega?
        </Text>
      </ModalAsync>
      <ModalAsync ref={modalRef2}>
        <Text align="left" size={18} weight="bold" mb="20">
          Deseja realmente finalizar essa entrega?
        </Text>
      </ModalAsync>
    </Container>
  )
}
