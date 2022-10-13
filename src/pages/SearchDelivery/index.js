import React, { useState } from 'react'
import { ScreenScrollContainer, Row, Text } from '../../components/atoms'
import { Button, Card, Input, RadioButton } from '../../components/molecules'
import { Validates } from '../../utils/validates'
import Toast from 'react-native-toast-message'

export function SearchDelivery({ navigation }) {
  const [errors, setErrors] = useState({
    Nome: '',
  })

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

  return (
    <ScreenScrollContainer
      contentContainerStyle={{
        alignItems: 'center',
      }}
    >
      <Text mt="80" size="35" weight="bold">
        Busca de Entregas
      </Text>

      <Row wp="90" mt="10" justify="space-between">
        <Text size="20">Valor maior ou igual que R$</Text>
      </Row>

      <Card mt="30">
        <Row justify="space-between" style={{ elevation: 10, zIndex: 10 }}>
          <Text size="20" mr="5">
            Nome do contratante
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
            Endereço origem:
          </Text>
        </Row>

        <Row
          justify="space-between"
          mt="10"
          style={{ elevation: 10, zIndex: 10 }}
        >
          <Text size="20" mr="5">
            Endereço Destino:
          </Text>
        </Row>

        <Row
          justify="space-between"
          mt="10"
          style={{ elevation: 10, zIndex: 10 }}
        >
          <Text size="20" mr="5">
            Valor:
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
    </ScreenScrollContainer>
  )
}
