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
} from '../../services/entrega'

export function SearchMotoboy({ navigation }) {
  const [contratacoesMotoboys, setcontratacoesMotoboys] = useState([])
  const [errors, setErrors] = useState({
    Nome: '',
  })

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('A')
  const [items, setItems] = useState([
    { label: 'Moto', value: 'M' },
    { label: 'Carro', value: 'C' },
    { label: 'Ambos', value: 'A' },
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
      const response = await buscarContratacoesMotoboys()

      /*if (value === 'A') {
        console.log('entrou')
        const response = await buscarContratacoesMotoboys()
      } else {
        console.log('nao entrou')
        const response = await buscarContratacoesMotoboysVeiculo(value)
      }*/

      if (response.status === 200) {
        setcontratacoesMotoboys(response.data.contratacoesMotoboys)
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
  }, [])

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

      {contratacoesMotoboys.map((item, key) => (
        <Card mt="30" key={key}>
          <Row justify="space-between" style={{ elevation: 10, zIndex: 10 }}>
            <Text size="20" mr="5">
              {item.contratado.nome}
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
              Avaliação:
            </Text>
          </Row>
          <Row
            justify="space-between"
            mt="10"
            style={{ elevation: 10, zIndex: 10 }}
          >
            <Text size="20" mr="5">
              {'Veículo: ' + item.contratado.flagtipoveiculo}
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
