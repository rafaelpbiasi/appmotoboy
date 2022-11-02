import React, { useEffect, useState } from 'react'
import {
  ScreenScrollContainer,
  Row,
  Text,
  Container,
} from '../../components/atoms'
import { Button, Card } from '../../components/molecules'
import DropDownPicker from 'react-native-dropdown-picker'
import { colors } from '../../styles/colors'
import Toast from 'react-native-toast-message'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  buscarContratacoesMotoboys,
  buscarContratacoesMotoboysVeiculo,
} from '../../services/usuario'
import { FlatList, RefreshControl } from 'react-native'

export function SearchMotoboy({ navigation }) {
  const [refreshing, setRefreshing] = useState(false)
  const [findmotoboys, setfindmotoboys] = useState([])
  const [errors, setErrors] = useState({
    Nome: '',
  })

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('A')
  const [items, setItems] = useState([
    { label: 'Ambos', value: 'A' },
    { label: 'Carro', value: 'C' },
    { label: 'Moto', value: 'M' },
  ])

  function validate() {
    var valid = true
    return valid
  }

  function handleNavigateContratar(idMotoboy) {
    navigation.navigate('RegisterDeliveryMotoboy', {
      idMotoboy,
    })
  }

  function handleNavigatePerfil(idUsuario) {
    navigation.navigate('VisualizarPerfil', {
      idUsuario,
    })
  }

  async function buscar() {
    try {
      var response = null

      console.log(value)
      if (value === 'A') {
        response = await buscarContratacoesMotoboys()
      } else {
        response = await buscarContratacoesMotoboysVeiculo(value)
      }

      if (response.status === 200) {
        setfindmotoboys(response.data.data)
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
      console.log(error)
    }
  }

  useEffect(() => {
    buscar()
  }, [value])

  function buscaDescrVeiculo(veiculo) {
    var descriVeiculo = ''

    if (veiculo === 'M') {
      descriVeiculo = 'Moto'
    } else if (veiculo === 'C') {
      descriVeiculo = 'Carro'
    } else {
      descriVeiculo = 'Ambos'
    }

    return descriVeiculo
  }

  return (
    <Container align="center">
      <Text mt="80" size="35" weight="bold">
        Busca de Motoboys
      </Text>

      <Row
        wp="90"
        mt="10"
        justify="space-between"
        style={{ elevation: 10, zIndex: 10 }}
      >
        <Text size="20" mr="5">
          Veículo:
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
        data={findmotoboys}
        style={{
          width: '90%',
        }}
        renderItem={({ item }) => (
          <Card mt="30" wp="100">
            <Row justify="space-between" style={{ elevation: 10, zIndex: 10 }}>
              <Text size="20" mr="5">
                {item.nome}
              </Text>
              <Button
                wp="48"
                h="40"
                w="90"
                onPress={() => handleNavigatePerfil(item.id)}
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
                {'Veículo: ' + buscaDescrVeiculo(item.flagtipoveiculo)}
              </Text>
            </Row>

            <Row
              justify="space-between"
              mt="10"
              style={{ elevation: 10, zIndex: 10 }}
            >
              <Text size="20" mr="5">
                {'Telefone: ' + item.telefone}
              </Text>
            </Row>

            <Button
              wp="48"
              mt="20"
              bg="greenLight"
              borderColor="greenLight"
              onPress={() => handleNavigateContratar(item.id)}
            >
              Contratar
            </Button>
          </Card>
        )}
        ListEmptyComponent={() => <Text>Nenhum motoboy encontrado!</Text>}
        keyExtractor={(item) => item.id}
      />
    </Container>
  )
}
