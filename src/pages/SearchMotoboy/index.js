import React, { useEffect, useState } from 'react'
import { ScreenScrollContainer, Row, Text } from '../../components/atoms'
import { Button, Card } from '../../components/molecules'
import DropDownPicker from 'react-native-dropdown-picker'
import { colors } from '../../styles/colors'
import Toast from 'react-native-toast-message'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  buscarContratacoesMotoboys,
  buscarContratacoesMotoboysVeiculo,
} from '../../services/usuario'

export function SearchMotoboy({ navigation }) {
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

  function handleNavigateContratar() {
    if (validate()) {
      navigation.reset({
        routes: [{ name: 'RegisterDeliveryMotoboy' }],
      })
    }
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
    <ScreenScrollContainer
      contentContainerStyle={{
        alignItems: 'center',
      }}
    >
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

      {findmotoboys.map((item, key) => (
        <Card mt="30" key={key}>
          <Row justify="space-between" style={{ elevation: 10, zIndex: 10 }}>
            <Text size="20" mr="5">
              {item.nome}
            </Text>
            <Button wp="48" h="40" w="90">
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
            onPress={handleNavigateContratar}
          >
            Contratar
          </Button>
        </Card>
      ))}
    </ScreenScrollContainer>
  )
}
