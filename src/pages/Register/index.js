import React, { useEffect, useState } from 'react'
import { Image } from 'react-native'
import { ScreenScrollContainer, Row, Text } from '../../components/atoms'
import { Button, Input, RadioButton } from '../../components/molecules'
import { Validates } from '../../utils/validates'
import { Camera, Gallery, MEDIA } from '../../utils/media'
import Toast from 'react-native-toast-message'
import { TextInputMask } from 'react-native-masked-text'
import { GenericButton } from '../../components/molecules/Button/styles'
import { cadastroUsuario } from '../../services/usuario'
import { Mask } from '../../utils/mask'

const tipos = {
  MOTOBOY: 'M',
  CONTRANTE: 'C',
}

const veiculos = {
  MOTO: 'M',
  CARRO: 'C',
  AMBOS: 'A',
}

export function Register({ route, navigation }) {
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

  useEffect(() => {
    if (route.params) {
      const { confirmouTermos } = route.params
      setTermos(confirmouTermos)
    }
  }, [route])

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

  async function handleNavigateCadastro() {
    try {
      if (!validate()) return

      const data = new FormData()

      data.append('nome', Nome)
      data.append('telefone', Telefone)
      data.append('email', Email)
      data.append('senha', Senha)
      data.append('cpfcnpj', Cpf)
      data.append('flagtipousuario', tipoUsuario)
      data.append('flagtipoveiculo', tipoVeiculo)
      data.append('rua', Rua)
      data.append('numero', Numero)
      data.append('cep', Cep)
      data.append('flagconfirmatermos', termos ? 'T' : 'F')
      if (image) {
        data.append('fotocnh', {
          name: Nome,
          type: 'image/jpg',
          uri: image,
        })
      }

      const response = await cadastroUsuario(data)

      console.log(response.data)
      if (response.status === 201) {
        navigation.reset({
          routes: [{ name: 'Login' }],
        })
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
              bg="white"
              color="greenDark"
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
            setCep(Mask.CepMask(text))
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
          setTelefone(Mask.TelefoneMask(text))
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
          setCpf(Mask.CpfCnpjMask(text))
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
          title=""
          checked={termos}
          setChecked={(isChecked) => {
            setTermos(isChecked)
          }}
          disableBuiltInState={
            route?.params?.confirmouTermos && termos ? true : false
          }
        />
        <GenericButton onPress={handleNavigateConfirmaTermos}>
          <Text size="20" weight="500">
            Confirma os termos de uso?
          </Text>
        </GenericButton>
      </Row>

      <Button mt="20" wp="48" mb="50" onPress={handleNavigateCadastro}>
        Cadastrar-se
      </Button>
    </ScreenScrollContainer>
  )
}
