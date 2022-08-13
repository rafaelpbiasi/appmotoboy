import React, { useState } from 'react'
import { ScreenScrollContainer, Row, Text } from '../../components/atoms'
import { Button, Input } from '../../components/molecules'
import { Validates } from '../../utils/validates'

export function Register({ navigation }) {
  const [Nome, setNome] = useState('')
  const [Telefone, setTelefone] = useState('')
  const [Email, setEmail] = useState('')
  const [Senha, setSenha] = useState('')
  const [ConfirmaSenha, setConfirmaSenha] = useState('')
  const [Cpf, setCpf] = useState('')
  const [errors, setErrors] = useState({
    Nome: '',
  })

  function validate() {
    var valid = true
    var dataErros = {
      Nome: '',
      Email: '',
      Senha: '',
      ConfirmaSenha: '',
      Cpf: '',
    }

    const validateNome = Validates.ValidateIsEmpty(Nome)
    const validateEmail = Validates.ValidateIsEmpty(Email)
    const validateEmailRegex = Validates.EmailValidator(Email)
    const validatePassword = Validates.ValidateIsEmpty(Senha)
    const validateconfirmpassword = Validates.ValidateIsEmpty(ConfirmaSenha)
    const validateCpf = Validates.ValidateIsEmpty(Cpf)

    if (validateNome) {
      setErrors((prevState) => {
        return {
          ...prevState,
          Nome: validateNome,
        }
      })
      valid = false
    }

    if (validateEmail) {
      setErrors((prevState) => {
        return {
          ...prevState,
          Email: validateEmail,
        }
      })
      valid = false
    } else if (validateEmailRegex) {
      setErrors((prevState) => {
        return {
          ...prevState,
          Email: validateEmailRegex,
        }
      })
      valid = false
    }

    if (validatePassword) {
      setErrors((prevState) => {
        return {
          ...prevState,
          Senha: validatePassword,
        }
      })
      valid = false
    }

    if (validateconfirmpassword) {
      setErrors((prevState) => {
        return {
          ...prevState,
          ConfirmaSenha: validateconfirmpassword,
        }
      })
      valid = false
    }

    if (validateCpf) {
      setErrors((prevState) => {
        return {
          ...prevState,
          Cpf: validateCpf,
        }
      })
      valid = false
    }

    return valid
  }

  function resetErrors() {
    setErrors({
      Nome: '',
      Telefone: '',
      Email: '',
      senha: '',
      confirmaSenha: '',
      Cpf: '',
    })
  }

  function handleNavigateCadastro() {
    if (validate()) {
      navigation.reset({
        routes: [{ name: 'Home' }],
      })
    }
  }

  return (
    <ScreenScrollContainer
      contentContainerStyle={{
        alignItems: 'center',
      }}
    >
      <Text mt="80" size="35" weight="bold">
        Cadastro
      </Text>

      <Row mb="20" justify="space-between">
        <Input
          label="Nome"
          value={Nome}
          onChangeText={(text) => {
            resetErrors()
            setNome(text)
          }}
          messageError={errors.Nome}
          returnKeyType={'next'}
          blurOnSubmit={false}
        />
        <Input
          label="Telefone"
          keyboardType="numeric"
          value={Telefone}
          onChangeText={(text) => {
            resetErrors()
            setTelefone(text)
          }}
          messageError={errors.Telefone}
          returnKeyType={'go'}
          onSubmitEditing={handleNavigateCadastro}
        />
      </Row>
      <Input
        label="E-mail"
        keyboardType="email-address"
        value={Email}
        onChangeText={(text) => {
          resetErrors()
          setEmail(text)
        }}
        messageError={errors.Email}
        returnKeyType={'go'}
        onSubmitEditing={handleNavigateCadastro}
      />
      <Input
        label="Senha"
        secureTextEntry={true}
        value={Senha}
        onChangeText={(text) => {
          resetErrors()
          setSenha(text)
        }}
        messageError={errors.Senha}
        returnKeyType={'go'}
        onSubmitEditing={handleNavigateCadastro}
      />
      <Input
        label="Confirme a senha"
        secureTextEntry={true}
        value={ConfirmaSenha}
        onChangeText={(text) => {
          resetErrors()
          setConfirmaSenha(text)
        }}
        messageError={errors.ConfirmaSenha}
        returnKeyType={'go'}
        onSubmitEditing={handleNavigateCadastro}
      />

      <Input
        label="Cpf"
        keyboardType="numeric"
        value={Cpf}
        onChangeText={(text) => {
          resetErrors()
          setCpf(text)
        }}
        messageError={errors.Cpf}
        returnKeyType={'go'}
        onSubmitEditing={handleNavigateCadastro}
      />

      <Button wp="48" onPress={handleNavigateCadastro}>
        Cadastrar-se
      </Button>
    </ScreenScrollContainer>
  )
}
