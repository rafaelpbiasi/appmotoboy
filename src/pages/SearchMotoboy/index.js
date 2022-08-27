import React, { useState } from 'react'
import { ScreenScrollContainer, Text } from '../../components/atoms'
import { Button } from '../../components/molecules'
import Toast from 'react-native-toast-message'

export function SearchMotoboy({ navigation }) {
  const [errors, setErrors] = useState({
    Nome: '',
  })

  function validate() {
    var valid = true
    return valid
  }

  function resetErrors() {}

  function handleNavigateCadastroEntrega() {
    navigation.navigate('RegisterDelivery')
  }

  function handleNavigateGerenciarEntrega() {
    navigation.navigate('ManageDelivery')
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

      <Button mt="20" wp="48" onPress={handleNavigateCadastroEntrega}>
        Adicionar entrega
      </Button>

      <Button mt="20" wp="48" onPress={handleNavigateGerenciarEntrega}>
        Gerenciar entregas
      </Button>
    </ScreenScrollContainer>
  )
}
