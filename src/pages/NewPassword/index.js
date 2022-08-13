import React, { useState } from 'react'
import { Row, Text, ScreenScrollContainer } from '../../components/atoms'
import { Button, Input } from '../../components/molecules'
import { Validates } from '../../utils/validates'

export function NewPassword({ navigation }) {
  const [senha, setsenha] = useState('')
  const [confirmaSenha, setconfirmaSenha] = useState('')
  const [errors, setErrors] = useState({
    senha: '',
  })

  function validate() {
    var valid = true
    var dataErros = {
      senha: '',
      confirmaSenha: '',
    }

    const validatePassword = Validates.ValidateIsEmpty(senha)
    const validateconfirmpassword = Validates.ValidateIsEmpty(confirmaSenha)
    const validadePasswordEquals = Validates.SenhaValidator(
      senha,
      confirmaSenha
    )

    if (validatePassword) {
      setErrors((prevState) => {
        return {
          ...prevState,
          senha: validatePassword,
        }
      })
      valid = false
    }

    if (validateconfirmpassword) {
      setErrors((prevState) => {
        return {
          ...prevState,
          confirmaSenha: validateconfirmpassword,
        }
      })
      valid = false
    } else if (validadePasswordEquals) {
      setErrors((prevState) => {
        return {
          ...prevState,
          confirmaSenha: validadePasswordEquals,
        }
      })
    }

    return valid
  }

  function resetErrors() {
    setErrors({
      senha: '',
      confirmaSenha: '',
    })
  }

  function handleNavigateAlterarSenha() {
    if (validate()) {
      navigation.reset({
        routes: [{ name: 'Login' }],
      })
    }
  }

  function handleNavigateCancelar() {
    navigation.reset({
      routes: [{ name: 'NewPassword' }],
    })
  }

  return (
    <ScreenScrollContainer
      contentContainerStyle={{
        alignItems: 'center',
      }}
    >
      <Text mt="80" size="20" weight="bold">
        Insira a nova senha com no mínimo 8 caracteres.
      </Text>

      <Input
        mt="50"
        label="Nova senha"
        secureTextEntry={true}
        placeholder="Digite a nova senha"
        value={senha}
        onChangeText={(text) => {
          resetErrors()
          setsenha(text)
        }}
        messageError={errors.senha}
        returnKeyType={'go'}
        onSubmitEditing={handleNavigateAlterarSenha}
      />

      <Input
        mt="21"
        label="Confirme a nova senha"
        secureTextEntry={true}
        placeholder="Digite a confirmação da nova senha"
        value={confirmaSenha}
        onChangeText={(text) => {
          resetErrors()
          setconfirmaSenha(text)
        }}
        messageError={errors.confirmaSenha}
        returnKeyType={'go'}
        onSubmitEditing={handleNavigateAlterarSenha}
      />

      <Row mt="40" mb="20" wp="90" justify="space-between">
        <Button wp="48" onPress={handleNavigateAlterarSenha}>
          Alterar
        </Button>
        <Button wp="48" onPress={handleNavigateCancelar}>
          Cancelar
        </Button>
      </Row>
    </ScreenScrollContainer>
  )
}
