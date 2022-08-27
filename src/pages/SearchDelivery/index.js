import React, { useState } from 'react'
import { ScreenScrollContainer, Row, Text } from '../../components/atoms'
import { Button, Input, RadioButton } from '../../components/molecules'
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

  return (
    <ScreenScrollContainer
      contentContainerStyle={{
        alignItems: 'center',
      }}
    >
      <Text mt="80" size="35" weight="bold">
        Busca de Entregas
      </Text>

      <Button mt="20" wp="48" onPress={handleNavigateSuasEntregas}>
        Suas entregas
      </Button>
    </ScreenScrollContainer>
  )
}
