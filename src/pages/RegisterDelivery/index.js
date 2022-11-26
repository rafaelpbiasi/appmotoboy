import React, { useState } from 'react'
import { ScreenScrollContainer, Row, Text } from '../../components/atoms'
import { Button, Input, RadioButton } from '../../components/molecules'
import { Validates } from '../../utils/validates'
import Toast from 'react-native-toast-message'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { cadastroContratacao, cadastroEntrega } from '../../services/entrega'
import { Mask } from '../../utils/mask'

export function RegisterDelivery({ navigation }) {
  const veiculos = {
    MOTO: 'M',
    CARRO: 'C',
  }

  const [errors, setErrors] = useState({
    RuaOrigem: '',
  })
  const [RuaOrigem, setRuaOrigem] = useState('')
  const [NumeroOrigem, setNumeroOrigem] = useState(null)
  const [BairroOrigem, setBairroOrigem] = useState('')
  const [RuaDestino, setRuaDestino] = useState('')
  const [NumeroDestino, setNumeroDestino] = useState(null)
  const [BairroDestino, setBairroDestino] = useState('')
  const [Cidade, setCidade] = useState('')
  const [Estado, setEstado] = useState('')
  const [Valor, setValor] = useState(null)
  const [Item, setItem] = useState('')
  const [Observacao, setObservacao] = useState('')

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

  async function handleNavigateSearchDelivery() {
    try {
      if (!validate()) return

      const dadosEntrega = {
        ruaorigem: RuaOrigem,
        numeroorigem: NumeroOrigem,
        bairroorigem: BairroOrigem,
        ruadestino: RuaDestino,
        numerodestino: NumeroDestino,
        bairrodestino: BairroDestino,
        valor: Number(String(Valor).replace(',', '.')),
        item: Item,
        cidade: Cidade,
        estado: Estado,
        observacao: Observacao,
      }

      const response = await cadastroEntrega(dadosEntrega)

      if (response.status === 201) {
        const usuarioLogado = JSON.parse(await AsyncStorage.getItem('usuario'))
        const data = new Date()

        const dadosContratacao = {
          status: 'P',
          codusuariocontratado: null,
          codusuariocontratante: usuarioLogado.id,
          codentrega: response.data.id,
          data: data,
        }

        const responseContratacao = await cadastroContratacao(dadosContratacao)

        if (responseContratacao.status === 201) {
          navigation.reset({
            routes: [{ name: 'ManageDelivery' }],
          })
        }

        if (responseContratacao.status === 400) {
          Toast.show({
            type: 'info',
            text1: 'Valide seus dados',
            visibilityTime: 6000,
          })
        }
      }

      if (response.status === 400) {
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
          returnKeyType={'go'}
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
          returnKeyType="done"
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
        returnKeyType={'go'}
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
          returnKeyType={'go'}
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
          returnKeyType="done"
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
        returnKeyType={'go'}
      />
      <Input
        label="Cidade"
        value={Cidade}
        onChangeText={(text) => {
          resetErrors()
          setCidade(text)
        }}
        messageError={errors.Cidade}
        returnKeyType={'go'}
      />
      <Input
        label="Estado"
        value={Estado}
        onChangeText={(text) => {
          resetErrors()
          setEstado(text)
        }}
        messageError={errors.Estado}
        returnKeyType={'go'}
      />
      <Input
        label="Valor"
        keyboardType="numeric"
        value={Valor}
        onChangeText={(text) => {
          resetErrors()
          setValor(Mask.MoedaMask(text))
        }}
        messageError={errors.Valor}
        returnKeyType="done"
      />

      <Input
        label="Item"
        value={Item}
        onChangeText={(text) => {
          resetErrors()
          setItem(text)
        }}
        messageError={errors.Item}
        returnKeyType={'go'}
      />

      <Input
        label="Observação"
        value={Observacao}
        onChangeText={(text) => {
          resetErrors()
          setObservacao(text)
        }}
        messageError={errors.Observacao}
        returnKeyType={'go'}
      />

      <Button mt="10" wp="48" mb="50" onPress={handleNavigateSearchDelivery}>
        Cadastrar entrega
      </Button>
    </ScreenScrollContainer>
  )
}
