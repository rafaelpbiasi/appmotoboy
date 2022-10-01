import React, { useState } from 'react'
import { ScreenScrollContainer, Row, Text } from '../../components/atoms'
import { Button, Card } from '../../components/molecules'
import Toast from 'react-native-toast-message'
import { Camera, Gallery, MEDIA } from '../../utils/media'

export function Perfil({ navigation }) {
  function handleNavigateRelatorio() {
    navigation.navigate('Relatorio')
  }

  const handleGallery = async () => {
    const result = await Gallery()
    if (result === MEDIA.CANCEL) {
      return
    }
    if (result === MEDIA.PERMISSIONS) {
      Toast.show({
        type: 'info',
        position: 'bottom',
        text1: 'É preciso dar permissões para o aplicativo acessar sua galeria',
        visibilityTime: 6000,
      })
      return
    }

    const { uri: image } = result
    setImage(image)
  }

  const handleCamera = async () => {
    const result = await Camera()
    if (result === MEDIA.CANCEL) {
      return
    }
    if (result === MEDIA.PERMISSIONS) {
      Toast.show({
        type: 'info',
        position: 'bottom',
        text1: 'É preciso dar permissões para o aplicativo acessar sua camera',
        visibilityTime: 6000,
      })
      return
    }

    const { uri: image } = result

    setImage(image)
  }

  return (
    <ScreenScrollContainer
      contentContainerStyle={{
        alignItems: 'center',
      }}
    >
      <Text wp="90" mt="90">
        Upload foto de Perfil
      </Text>
      <Row wp="90" mt="15" justify="space-between">
        <Button
          wp="30"
          onPress={async () => {
            await handleGallery()
          }}
          bg="white"
          color="greenDark"
        >
          Galeria
        </Button>
        <Button
          wp="30"
          onPress={async () => {
            await handleCamera()
          }}
        >
          Camera
        </Button>
      </Row>

      <Text wp="90" mt="20">
        Nome do Usuário
      </Text>

      <Row justify="space-between" mt="40" ml="60">
        <Text size="20" mr="5">
          Avaliação
        </Text>

        <Button wp="48" h="40" w="90" mr="60" onPress={handleNavigateRelatorio}>
          Relatório
        </Button>
      </Row>
      <Row justify="space-between" mt="10" ml="60">
        <Text size="20" mr="5">
          Número
        </Text>
      </Row>

      <Row justify="space-between" mt="30" ml="60">
        <Text size="30" mr="5">
          Comentários
        </Text>
      </Row>

      <Card mt="30">
        <Row justify="space-between" style={{ elevation: 10, zIndex: 10 }}>
          <Text size="15" mr="5">
            Nome do avaliador
          </Text>
        </Row>
      </Card>
    </ScreenScrollContainer>
  )
}
