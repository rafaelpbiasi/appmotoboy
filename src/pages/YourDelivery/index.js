import React, { useEffect, useState } from 'react'
import { ScreenScrollContainer, Row, Text } from '../../components/atoms'
import { Button, Card, Input, RadioButton } from '../../components/molecules'
import DropDownPicker from 'react-native-dropdown-picker'
import { colors } from '../../styles/colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-toast-message'
import {
  buscarContratacoesMotoboysStatus,
  buscarContratacoesPorMotoboy,
} from '../../services/entrega'

export function YourDelivery({ navigation }) {
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

  function validate() {
    var valid = true
    return valid
  }

  async function buscar() {
    try {
      const usuarioLogado = JSON.parse(await AsyncStorage.getItem('usuario'))
      const response = await buscarContratacoesPorMotoboy(usuarioLogado.id)

      /*if (value === 'T') {
        console.log('entrou')
        const response = await buscarContratacoesPorMotoboy(usuarioLogado.id)
      } else {
        console.log('nao entrou')
        const response = await buscarContratacoesMotoboysStatus(
          usuarioLogado.id,
          value
        )
      }*/

      if (response.status === 200) {
        setcontratacoesMotoboy(response.data.contratacoesMotoboy)
      }

      if (response.status === 404) {
        Toast.show({
          type: 'error',
          text1: 'Usuario nao encontrado',
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

  return (
    <ScreenScrollContainer
      contentContainerStyle={{
        alignItems: 'center',
      }}
    >
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
      {contratacoesMotoboy.map((item, key) => (
        <Card mt="30" key={key}>
          <Row justify="space-between" style={{ elevation: 10, zIndex: 10 }}>
            <Text size="20" mr="5">
              {item.contratante.nome}
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
            <Text size="20" mr="5" align="left">
              {'Origem: Rua: ' +
                item.entrega.ruaorigem +
                ', bairro: ' +
                item.entrega.bairroorigem +
                ', N° ' +
                item.entrega.numeroorigem +
                ', Referência: ' +
                item.entrega.referenciaorigem}
            </Text>
          </Row>
          <Row
            justify="space-between"
            mt="10"
            style={{ elevation: 10, zIndex: 10 }}
          >
            <Text size="20" mr="5" align="left">
              {'Destino: Rua: ' +
                item.entrega.ruadestino +
                ', bairro: ' +
                item.entrega.bairrodestino +
                ', N°: ' +
                item.entrega.numerodestino +
                ', Referência: ' +
                item.entrega.referenciadestino}
            </Text>
          </Row>

          <Row
            justify="space-between"
            mt="10"
            style={{ elevation: 10, zIndex: 10 }}
          >
            <Button wp="48" mt="20" bg="greenLight" borderColor="greenLight">
              Abrir GPS
            </Button>
            <Button wp="48" mt="20" bg="greenLight" borderColor="greenLight">
              Finalizar
            </Button>
          </Row>
        </Card>
      ))}
    </ScreenScrollContainer>
  )
}
