import React, { useState } from 'react'
import { Image } from 'react-native'
import { ScreenScrollContainer, Row, Text } from '../../components/atoms'
import { Button, Input, RadioButton } from '../../components/molecules'
import { Validates } from '../../utils/validates'
import { Camera, Gallery, MEDIA } from '../../utils/media'
import Toast from 'react-native-toast-message'
import { TextInputMask } from 'react-native-masked-text'
import { GenericButton } from '../../components/molecules/Button/styles'

const tipos = {
  MOTOBOY: 'motoboy',
  CONTRANTE: 'contrante',
}

const veiculos = {
  MOTO: 'moto',
  CARRO: 'carro',
  AMBOS: 'ambos',
}

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
  const [tipoUsuario, setTipoUsuario] = useState(tipos.MOTOBOY)
  const [tipoVeiculo, setTipoVeiculo] = useState(veiculos.MOTO)
  const [termos, setTermos] = useState(false)
  const [image, setImage] = useState(null)
  const [Rua, setRua] = useState('')
  const [Numero, setNumero] = useState('')
  const [Cep, setCep] = useState('')

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
    const validadePasswordEquals = Validates.SenhaValidator(
      Senha,
      ConfirmaSenha
    )

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
    } else if (validadePasswordEquals) {
      setErrors((prevState) => {
        return {
          ...prevState,
          ConfirmaSenha: validadePasswordEquals,
          Senha: validadePasswordEquals,
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

  function handleNavigateConfirmaTermos() {
    navigation.navigate('ConfirmTerms')
  }

  function handleNavigateCadastro() {
    if (validate()) {
      navigation.reset({
        routes: [{ name: 'Home' }],
      })
    }
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

  function apresentarCamposComBaseNoTipo() {
    if (tipoUsuario === tipos.MOTOBOY) {
      return (
        <>
          <Row wp="90" mt="10">
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
          <Text mt="20">Upload foto CNH</Text>
          <Row wp="90" mt="15" justify="space-between">
            <Button
              wp="30"
              onPress={async () => {
                await handleGallery()
              }}
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
        </>
      )
    }
    return (
      <>
        <Row mt="20" wp="90" justify="space-between">
          <Input
            label="Rua"
            value={Rua}
            onChangeText={(text) => {
              resetErrors()
              setRua(text)
            }}
            messageError={errors.Rua}
            returnKeyType={'next'}
            blurOnSubmit={false}
            wpContainer="68"
            wp="100"
          />
          <Input
            label="Número"
            keyboardType="numeric"
            value={Numero}
            onChangeText={(text) => {
              resetErrors()
              setNumero(text)
            }}
            messageError={errors.Numero}
            returnKeyType={'go'}
            wpContainer="30"
            wp="100"
          />
        </Row>
        <Input
          label="CEP"
          keyboardType="numeric"
          value={Cep}
          onChangeText={(text) => {
            resetErrors()
            setCep(text)
          }}
          messageError={errors.Cep}
          returnKeyType={'go'}
        />
      </>
    )
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
      />
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
      />

      <Input
        label={tipoUsuario === tipos.MOTOBOY ? 'CPF' : 'CPF/CNPJ'}
        keyboardType="numeric"
        value={Cpf}
        onChangeText={(text) => {
          resetErrors()
          setCpf(text)
        }}
        messageError={errors.Cpf}
        returnKeyType={'go'}
      />

      <Row wp="90" mt="10">
        <Row wp="30">
          <RadioButton
            checked={tipoUsuario === tipos.MOTOBOY}
            setChecked={(isChecked) => {
              setTipoUsuario(tipos.MOTOBOY)
            }}
            title="Motoboy"
          />
        </Row>
        <RadioButton
          checked={tipoUsuario === tipos.CONTRANTE}
          setChecked={(isChecked) => {
            setTipoUsuario(tipos.CONTRANTE)
          }}
          ml={24}
          title="Contratante"
        />
      </Row>
      {apresentarCamposComBaseNoTipo()}

      <Row wp="90" mt="20">
        <RadioButton
          checked={termos}
          setChecked={(isChecked) => {
            setTermos(isChecked)
          }}
          disableBuiltInState={false}
        />
        <GenericButton onPress={handleNavigateConfirmaTermos}>
          <Text size="20" weight="500">
            Confirma os termos de uso?
          </Text>
        </GenericButton>
      </Row>

      <Button mt="20" wp="48" onPress={handleNavigateCadastro}>
        Cadastrar-se
      </Button>
    </ScreenScrollContainer>
  )
}
