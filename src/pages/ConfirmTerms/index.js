import React, { useState } from 'react'
import { ScreenScrollContainer, Row, Text } from '../../components/atoms'
import { Button, Input, RadioButton } from '../../components/molecules'
import { Validates } from '../../utils/validates'
import Toast from 'react-native-toast-message'

export function ConfirmTerms({ navigation }) {
  function handleNavigateRegister() {
    navigation.navigate('Register', {
      confirmouTermos: true,
    })
  }

  return (
    <ScreenScrollContainer
      contentContainerStyle={{
        alignItems: 'center',
      }}
    >
      <Text mt="80" size="35" weight="bold">
        Termos de uso
      </Text>

      <Button mt="20" wp="48" onPress={handleNavigateRegister}>
        Confirmar
      </Button>
    </ScreenScrollContainer>
  )
}
