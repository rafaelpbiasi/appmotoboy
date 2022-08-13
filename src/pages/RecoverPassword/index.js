import React, { useState } from 'react'
import {
  Container,
  Row,
  Text,
  ScreenScrollContainer,
} from '../../components/atoms'
import { Button, Input } from '../../components/molecules'
import { Validates } from '../../utils/validates'

export function RecoverPassword({ navigation }) {
  const [email, setemail] = useState('')
  const [errors, setErrors] = useState({
    email: '',
  })

  function validate() {
    var valid = true
    var dataErros = {
      email: '',
    }

    const validateEmail = Validates.ValidateIsEmpty(email)
    const validateEmailRegex = Validates.EmailValidator(email)

    if (validateEmail) {
      setErrors((prevState) => {
        return {
          ...prevState,
          email: validateEmail,
        }
      })
      valid = false
    } else if (validateEmailRegex) {
      setErrors((prevState) => {
        return {
          ...prevState,
          email: validateEmailRegex,
        }
      })
      valid = false
    }
    return valid
  }

  function resetErrors() {
    setErrors({
      email: '',
    })
  }

  function handleNavigateEmail() {
    if (validate()) {
      navigation.reset({
        routes: [{ name: 'NewPassword' }],
      })
    }
  }

  return (
    <ScreenScrollContainer
      contentContainerStyle={{
        alignItems: 'center',
      }}
    >
      <Text mt="80" size="20" weight="bold">
        Para recuperar/alterar sua senha, insira seu e-mail de login.
      </Text>

      <Input
        mt="50"
        label="E-mail"
        keyboardType="email-address"
        placeholder="Digite seu e-mail"
        value={email}
        onChangeText={(text) => {
          resetErrors()
          setemail(text)
        }}
        messageError={errors.email}
        returnKeyType={'next'}
        blurOnSubmit={false}
      />
      <Button wp="48" mt="20" onPress={handleNavigateEmail}>
        Enviar
      </Button>
    </ScreenScrollContainer>
  )
}
