import React, { useContext, useState } from 'react'
import {
  ScreenScrollContainer,
  Row,
  Text,
  CardImage,
} from '../../components/atoms'
import { Button, Input } from '../../components/molecules'
import { GenericButton } from '../../components/molecules/Button/styles'
import { Validates } from '../../utils/validates'
import Toast from 'react-native-toast-message'
import { login } from '../../services/usuario'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import AuthContext from '../../contexts/auth'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [next, setNext] = useState('')
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  })

  const { signIn } = useContext(AuthContext)
  const navigation = useNavigation()

  function validate() {
    var valid = true
    var dataErros = {
      email: '',
      password: '',
    }

    const validateLogin = Validates.ValidateIsEmpty(email)
    const validateLoginRegex = Validates.EmailValidator(email)
    const validatePassword = Validates.ValidateIsEmpty(password)

    if (validateLogin) {
      setErrors((prevState) => {
        return {
          ...prevState,
          email: validateLogin,
        }
      })
      valid = false
    } else if (validateLoginRegex) {
      setErrors((prevState) => {
        return {
          ...prevState,
          email: validateLoginRegex,
        }
      })
      valid = false
    }

    if (validatePassword) {
      setErrors((prevState) => {
        return {
          ...prevState,
          password: validatePassword,
        }
      })
      valid = false
    }

    return valid
  }

  function resetErrors() {
    setErrors({
      password: '',
      email: '',
    })
  }

  async function handleNavigateSearchDelivery() {
    try {
      if (!validate()) return
      const dadosLogin = {
        email: email,
        senha: password,
      }
      const response = await signIn(dadosLogin)

      if (response.status === 404) {
        Toast.show({
          type: 'error',
          text1: 'Dados inválidos',
          visibilityTime: 6000,
        })
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro inesperado',
        visibilityTime: 6000,
      })
    }
  }

  function handleNavigateRegister() {
    navigation.navigate('Register')
  }

  function handleNavigateRecoverPassword() {
    navigation.navigate('RecoverPassword')
  }

  return (
    <ScreenScrollContainer
      contentContainerStyle={{
        alignItems: 'center',
      }}
    >
      <Text mt="80" size="35" weight="bold">
        Easy Delivery
      </Text>
      <CardImage
        w="200"
        h="200"
        mt="40"
        resizeMode="contain"
        source={require('../../../assets/images/logo.jpeg')}
      />
      <Input
        mt="40"
        label="Login"
        keyboardType="email-address"
        placeholder="Digite seu login"
        value={email}
        onChangeText={(text) => {
          resetErrors()
          setEmail(text)
        }}
        messageError={errors.email}
        returnKeyType={'next'}
        onSubmitEditing={() => {
          next.focus()
        }}
        blurOnSubmit={false}
      />
      <Input
        mt="22"
        label="Senha"
        secureTextEntry={true}
        placeholder="Digite sua senha"
        value={password}
        onChangeText={(text) => {
          resetErrors()
          setPassword(text)
        }}
        messageError={errors.password}
        innerRef={(input) => {
          setNext(input)
        }}
        returnKeyType={'go'}
        onSubmitEditing={handleNavigateSearchDelivery}
      />
      <Row wp="85" mt="8">
        <GenericButton onPress={handleNavigateRecoverPassword}>
          <Text size="20" weight="500">
            Esqueceu sua senha?
          </Text>
        </GenericButton>
      </Row>
      <Row mt="60" mb="20" wp="90" justify="space-between">
        <Button
          wp="48"
          bg="white"
          color="greenDark"
          onPress={handleNavigateRegister}
        >
          Cadastrar-se
        </Button>
        <Button wp="48" onPress={handleNavigateSearchDelivery}>
          Entrar
        </Button>
      </Row>
    </ScreenScrollContainer>
  )
}
