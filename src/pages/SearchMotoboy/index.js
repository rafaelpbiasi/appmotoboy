import React, { useState } from 'react'
import { ScreenScrollContainer, Row, Text } from '../../components/atoms'
import { Button, Card } from '../../components/molecules'
import DropDownPicker from 'react-native-dropdown-picker'
import { colors } from '../../styles/colors'

export function SearchMotoboy({ navigation }) {
  const [errors, setErrors] = useState({
    Nome: '',
  })

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('M')
  const [items, setItems] = useState([
    { label: 'Moto', value: 'M' },
    { label: 'Carro', value: 'C' },
    { label: 'Ambos', value: 'A' },
  ])

  function validate() {
    var valid = true
    return valid
  }

  function handleNavigateContratar() {
    if (validate()) {
      navigation.reset({
        routes: [{ name: 'RegisterDeliveryMotoboy' }],
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
        Busca de Motoboys
      </Text>

      <Row
        wp="90"
        mt="10"
        justify="space-between"
        style={{ elevation: 10, zIndex: 10 }}
      >
        <Text size="20" mr="5">
          Veículo:
        </Text>
        <DropDownPicker
          //Aqui da o erro, porque está abrindo um scrollView dentro do outro
          style={{
            borderColor: colors.greenDark,
          }}
          textStyle={{
            color: colors.greenDark,
          }}
          containerStyle={{
            width: '80%',
          }}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
      </Row>

      <Row wp="90" mt="10" justify="space-between">
        <Text size="20">Avaliação:</Text>
      </Row>

      <Card mt="30">
        <Row justify="space-between" style={{ elevation: 10, zIndex: 10 }}>
          <Text size="20" mr="5">
            Nome do motoboy
          </Text>

          <Button wp="48" h="40" w="90">
            Perfil
          </Button>
        </Row>

        <Row
          justify="space-between"
          mt="10"
          style={{ elevation: 10, zIndex: 10 }}
        >
          <Text size="20" mr="5">
            Avaliação:
          </Text>
        </Row>

        <Row
          justify="space-between"
          mt="10"
          style={{ elevation: 10, zIndex: 10 }}
        >
          <Text size="20" mr="5">
            Veículo:
          </Text>
        </Row>
        <Button
          wp="48"
          mt="20"
          bg="greenLight"
          borderColor="greenLight"
          onPress={handleNavigateContratar}
        >
          Contratar
        </Button>
      </Card>
    </ScreenScrollContainer>
  )
}
