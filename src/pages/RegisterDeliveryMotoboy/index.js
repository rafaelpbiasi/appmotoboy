import React, { useState } from 'react'
import { ScreenScrollContainer, Row, Text } from '../../components/atoms'
import { Button, Input, RadioButton } from '../../components/molecules'
import { Validates } from '../../utils/validates'
import Toast from 'react-native-toast-message'
import { cadastroEntrega } from '../../services/entrega'

export function RegisterDeliveryMotoboy({ navigation }) {
  const veiculos = {
    MOTO: 'moto',
    CARRO: 'carro',
    AMBOS: 'ambos',
  }

  const [errors, setErrors] = useState({
    RuaOrigem: '',
  })
  const [RuaOrigem, setRuaOrigem] = useState('')
  const [NumeroOrigem, setNumeroOrigem] = useState('')
  const [BairroOrigem, setBairroOrigem] = useState('')
  const [ReferenciaOrigem, setReferenciaOrigem] = useState('')
  const [RuaDestino, setRuaDestino] = useState('')
  const [NumeroDestino, setNumeroDestino] = useState('')
  const [BairroDestino, setBairroDestino] = useState('')
  const [ReferenciaDestino, setReferenciaDestino] = useState('')
  const [tipoVeiculo, setTipoVeiculo] = useState(veiculos.MOTO)
  const [Valor, setValor] = useState('')
  const [Item, setItem] = useState('')

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
      Valor: 0,
    })
  }

  async function handleNavigateSearchDelivery() {
    try {
      const dadosEntrega = {
        ruaorigem: RuaOrigem,
        numeroorigem: NumeroOrigem,
        bairroorigem: BairroOrigem,
        referenciaorigem: ReferenciaOrigem,
        ruadestino: RuaDestino,
        numerodestino: NumeroDestino,
        bairrodestino: BairroDestino,
        referenciadestino: ReferenciaDestino,
        valor: Valor,
        flagtipoveiculo: tipoVeiculo,
        item: Item,
        cidade: 'Dois Vizinhos',
        estado: 'Parana',
      }
      const response = await cadastroEntrega(dadosEntrega)

      if (response.status === 201) {
        if (validate()) {
          navigation.reset({
            routes: [
              { name: 'MainTabBottom', params: { screen: 'SearchMotoboy' } },
            ],
          })
        }
      }

      if (response.status === 400) {
        console.log(response.data)
        Toast.show({
          type: 'info',
          text1: 'Valide seus dados',
          visibilityTime: 6000,
        })
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro inesperado',
        visibilityTime: 6000,
      })
      console.log(error)
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
      <Input
        label="Referência Origem"
        value={ReferenciaOrigem}
        onChangeText={(text) => {
          resetErrors()
          setReferenciaOrigem(text)
        }}
        messageError={errors.ReferenciaOrigem}
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
        label="Referência Destino"
        value={ReferenciaDestino}
        onChangeText={(text) => {
          resetErrors()
          setReferenciaDestino(text)
        }}
        messageError={errors.ReferenciaDestino}
        returnKeyType={'next'}
        blurOnSubmit={false}
      />
      <>
        <Row wp="90" mt="10" mb="10">
          <Row wp="30">
            <RadioButton
              checked={tipoVeiculo === veiculos.MOTO}
              setChecked={() => {
                setTipoVeiculo(veiculos.MOTO)
              }}
              title="Moto"
            />
          </Row>
          <Row wp="40">
            <RadioButton
              checked={tipoVeiculo === veiculos.CARRO}
              setChecked={() => {
                setTipoVeiculo(veiculos.CARRO)
              }}
              ml={24}
              title="Carro"
            />
          </Row>
          <RadioButton
            checked={tipoVeiculo === veiculos.AMBOS}
            setChecked={() => {
              setTipoVeiculo(veiculos.AMBOS)
            }}
            title="Ambos"
          />
        </Row>
      </>
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

      <Input
        label="Item"
        value={Item}
        onChangeText={(text) => {
          resetErrors()
          setItem(text)
        }}
        messageError={errors.Item}
        returnKeyType={'next'}
        blurOnSubmit={false}
      />

      <Button mt="10" wp="48" mb="50" onPress={handleNavigateSearchDelivery}>
        Cadastrar entrega
      </Button>
    </ScreenScrollContainer>
  )
}
