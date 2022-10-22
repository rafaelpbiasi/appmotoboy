import React, { useEffect, useState } from 'react'
import { ScreenScrollContainer, Row, Text } from '../../components/atoms'
import { Button, Card, Input, RadioButton } from '../../components/molecules'
import { Validates } from '../../utils/validates'
import Toast from 'react-native-toast-message'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { buscarContratacoesEntregas } from '../../services/entrega'

export function SearchDelivery({ navigation }) {
  const [contratacoesEntrega, setcontratacoesEntrega] = useState([])
  const [errors, setErrors] = useState({
    Nome: '',
  })
  const [value, setValue] = useState(0)

  function validate() {
    var valid = true
    return valid
  }

  function resetErrors() {}

  function handleNavigateSuasEntregas() {
    navigation.navigate('YourDelivery')
  }

  function handleNavigateAceitarEntrega() {
    if (validate()) {
      Toast.show({
        type: 'info',
        text1:
          'Entrega aceita com sucesso, você tem 30 minutos para buscar o produto e realizar a entrega',
        visibilityTime: 6000,
      })
    }
  }

  async function buscar() {
    try {
      const response = await buscarContratacoesEntregas()

      if (response.status === 200) {
        setcontratacoesEntrega(response.data.contratacoesEntrega)
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

  return (
    <ScreenScrollContainer
      contentContainerStyle={{
        alignItems: 'center',
      }}
    >
      <Text mt="80" size="35" weight="bold">
        Busca de Entregas
      </Text>

      <Row mt="10" justify="space-between">
        <Input
          label="Valor"
          placeholder="Digite um valor..."
          keyboardType="numeric"
          value={value}
        />
      </Row>

      {contratacoesEntrega.map((item, key) => (
        <Card mt="20" key={key}>
          <Row justify="space-between" style={{ elevation: 10, zIndex: 10 }}>
            <Text size="20" mr="5">
              {item?.contratante?.nome}
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
            <Button wp="48" mt="20" bg="greenLight" borderColor="greenLight">
              Abrir GPS
            </Button>
            <Button
              wp="48"
              mt="20"
              bg="greenLight"
              borderColor="greenLight"
              onPress={handleNavigateAceitarEntrega}
            >
              Aceitar
            </Button>
          </Row>
        </Card>
      ))}
    </ScreenScrollContainer>
  )
}
