import React, { useState } from 'react'
import { ScreenScrollContainer, Row, Text } from '../../components/atoms'
import { Button, Input } from '../../components/molecules'
import { Validates } from '../../utils/validates'
import Toast from 'react-native-toast-message'

export function RegisterDelivery({ navigation }) {
  const [errors, setErrors] = useState({
    RuaOrigem: '',
  })
  const [RuaOrigem, setRuaOrigem] = useState('')
  const [NumeroOrigem, setNumeroOrigem] = useState('')
  const [BairroOrigem, setBairroOrigem] = useState('')
  const [RuaDestino, setRuaDestino] = useState('')
  const [NumeroDestino, setNumeroDestino] = useState('')
  const [BairroDestino, setBairroDestino] = useState('')
  const [Valor, setValor] = useState('')

  function validate() {
    var valid = true

    const validateRuaOrigem = Validates.ValidateIsEmpty(RuaOrigem)
    const validateNumeroOrigem = Validates.ValidateIsEmpty(NumeroOrigem)
    const validateBairroOrigem = Validates.ValidateIsEmpty(BairroOrigem)
    const validateRuaDestino = Validates.ValidateIsEmpty(RuaDestino)
    const validateNumeroDestino = Validates.ValidateIsEmpty(NumeroDestino)
    const validateBairroDestino = Validates.ValidateIsEmpty(BairroDestino)

    if (validateRuaOrigem) {
      setErrors((prevState) => {
        return {
          ...prevState,
          RuaOrigem: validateRuaOrigem,
        }
      })
      valid = false
    }
    if (validateNumeroOrigem) {
      setErrors((prevState) => {
        return {
          ...prevState,
          NumeroOrigem: validateNumeroOrigem,
        }
      })
      valid = false
    }
    if (validateBairroOrigem) {
      setErrors((prevState) => {
        return {
          ...prevState,
          BairroOrigem: validateBairroOrigem,
        }
      })
      valid = false
    }
    if (validateRuaDestino) {
      setErrors((prevState) => {
        return {
          ...prevState,
          RuaDestino: validateRuaDestino,
        }
      })
      valid = false
    }
    if (validateNumeroDestino) {
      setErrors((prevState) => {
        return {
          ...prevState,
          NumeroDestino: validateNumeroDestino,
        }
      })
      valid = false
    }
    if (validateBairroDestino) {
      setErrors((prevState) => {
        return {
          ...prevState,
          BairroDestino: validateBairroDestino,
        }
      })
      valid = false
    }
    return valid
  }

  function resetErrors() {
    setErrors({
      RuaOrigem: '',
      NumeroOrigem: '',
      BairroOrigem: '',
      RuaDestino: '',
      NumeroDestino: '',
      BairroDestino: '',
      Valor: '',
    })
  }

  function handleNavigateSearchDelivery() {
    if (validate()) {
      navigation.reset({
        routes: [{ name: 'SearchMotoboy' }],
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
        Cadastro de entregas
      </Text>

      <Row mt="20" wp="90" justify="space-between">
        <Input
          label="Rua Origem"
          value={RuaOrigem}
          onChangeText={(text) => {
            resetErrors()
            setRuaOrigem(text)
          }}
          messageError={errors.RuaOrigem}
          returnKeyType={'next'}
          blurOnSubmit={false}
          wpContainer="68"
          wp="100"
        />
        <Input
          label="Nº Origem"
          keyboardType="numeric"
          value={NumeroOrigem}
          onChangeText={(text) => {
            resetErrors()
            setNumeroOrigem(text)
          }}
          messageError={errors.NumeroOrigem}
          returnKeyType={'go'}
          wpContainer="30"
          wp="100"
        />
      </Row>
      <Input
        label="Bairro Origem"
        value={BairroOrigem}
        onChangeText={(text) => {
          resetErrors()
          setBairroOrigem(text)
        }}
        messageError={errors.BairroOrigem}
        returnKeyType={'next'}
        blurOnSubmit={false}
      />

      <Row wp="90" justify="space-between">
        <Input
          label="Rua Destino"
          value={RuaDestino}
          onChangeText={(text) => {
            resetErrors()
            setRuaDestino(text)
          }}
          messageError={errors.RuaDestino}
          returnKeyType={'next'}
          blurOnSubmit={false}
          wpContainer="68"
          wp="100"
        />
        <Input
          label="Nº Destino"
          keyboardType="numeric"
          value={NumeroDestino}
          onChangeText={(text) => {
            resetErrors()
            setNumeroDestino(text)
          }}
          messageError={errors.NumeroDestino}
          returnKeyType={'go'}
          wpContainer="30"
          wp="100"
        />
      </Row>
      <Input
        label="Bairro Destino"
        value={BairroDestino}
        onChangeText={(text) => {
          resetErrors()
          setBairroDestino(text)
        }}
        messageError={errors.BairroDestino}
        returnKeyType={'next'}
        blurOnSubmit={false}
      />
      <Input
        label="Valor"
        keyboardType="numeric"
        value={Valor}
        onChangeText={(text) => {
          resetErrors()
          setValor(text)
        }}
        messageError={errors.Valor}
        returnKeyType={'next'}
        blurOnSubmit={false}
      />

      <Button mt="10" wp="48" onPress={handleNavigateSearchDelivery}>
        Cadastrar entrega
      </Button>
    </ScreenScrollContainer>
  )
}
