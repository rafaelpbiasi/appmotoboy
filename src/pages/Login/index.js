import React, { useState } from 'react'
import {
  ScreenScrollContainer,
  Row,
  Text,
  CardImage,
} from '../../components/atoms'
import { Button, Input } from '../../components/molecules'
import { GenericButton } from '../../components/molecules/Button/styles'
import { Validates } from '../../utils/validates'

export function Login({ navigation }) {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [next, setNext] = useState('')
  const [errors, setErrors] = useState({
    login: '',
    password: '',
  })

  function validate() {
    var valid = true
    var dataErros = {
      login: '',
      password: '',
    }

    const validateLogin = Validates.ValidateIsEmpty(login)
    const validateLoginRegex = Validates.EmailValidator(login)
    const validatePassword = Validates.ValidateIsEmpty(password)

    if (validateLogin) {
      setErrors((prevState) => {
        return {
          ...prevState,
          login: validateLogin,
        }
      })
      valid = false
    } else if (validateLoginRegex) {
      setErrors((prevState) => {
        return {
          ...prevState,
          login: validateLoginRegex,
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
      login: '',
    })
  }

  function handleNavigateSearchDelivery() {
    if (validate()) {
      navigation.reset({
        routes: [{ name: 'MainTabBottom' }],
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
        NOME APP
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
        value={login}
        onChangeText={(text) => {
          resetErrors()
          setLogin(text)
        }}
        messageError={errors.login}
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
