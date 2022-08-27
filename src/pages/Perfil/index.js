import React, { useState } from 'react'
import { ScreenScrollContainer, Row, Text } from '../../components/atoms'
import { Button, Input, RadioButton } from '../../components/molecules'
import { Validates } from '../../utils/validates'
import Toast from 'react-native-toast-message'

export function Perfil({ navigation }) {
  function handleNavigateRelatorio() {
    navigation.navigate('Relatorio')
  }

  return (
    <ScreenScrollContainer
      contentContainerStyle={{
        alignItems: 'center',
      }}
    >
      <Text mt="80" size="35" weight="bold">
        Perfil
      </Text>

      <Button mt="20" wp="48" onPress={handleNavigateRelatorio}>
        Relatório
      </Button>
    </ScreenScrollContainer>
  )
}
