import React, { useContext, useState } from 'react'
import { ScreenScrollContainer, Row, Text } from '../../components/atoms'
import { Button, Card, Input } from '../../components/molecules'
import Toast from 'react-native-toast-message'
import { Camera, Gallery, MEDIA } from '../../utils/media'
import Icon from 'react-native-vector-icons/Ionicons'
import { colors } from '../../styles/colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import AuthContext from '../../contexts/auth'

export function Perfil() {
  const navigation = useNavigation()
  const { signOut } = useContext(AuthContext)
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

  const sair = async () => {
    await signOut()
  }

  return (
    <ScreenScrollContainer
      contentContainerStyle={{
        alignItems: 'center',
      }}
    >
      <Row justify="space-between" wp="90" mt="90">
        <Text>Nome do Usuário</Text>
        <Button onPress={sair} borderColor="green" bg="white" w="40" h="40">
          <Icon name="exit-outline" size={30} color={colors.green} />
        </Button>
      </Row>

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

      <Row justify="space-between" style={{ elevation: 10, zIndex: 10 }}>
        <Input placeholder="Escreva um comentário..." />
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
