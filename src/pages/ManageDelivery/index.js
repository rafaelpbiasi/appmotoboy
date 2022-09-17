import React, { useState } from 'react'
import { ScreenScrollContainer, Row, Text } from '../../components/atoms'
import { Button, Input, RadioButton, Card } from '../../components/molecules'
import { Validates } from '../../utils/validates'
import Toast from 'react-native-toast-message'
import DropDownPicker from 'react-native-dropdown-picker'
import { colors } from '../../styles/colors'

export function ManageDelivery({ navigation }) {
  const [errors, setErrors] = useState({
    Nome: '',
  })
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('todas')
  const [items, setItems] = useState([
    { label: 'Todas', value: 'todas' },
    { label: 'Iniciada', value: 'iniciada' },
    { label: 'Finalizada', value: 'finalizada' },
  ])

  function validate() {
    var valid = true
    return valid
  }

  function resetErrors() {}

  return (
    <ScreenScrollContainer
      contentContainerStyle={{
        alignItems: 'center',
      }}
    >
      <Text mt="80" size="35" weight="bold">
        Gerenciar Entregas
      </Text>

      <Row
        wp="90"
        mt="10"
        justify="space-between"
        style={{ elevation: 10, zIndex: 10 }}
      >
        <Text size="20" mr="5">
          Status
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
            Status:
          </Text>
        </Row>
      </Card>
    </ScreenScrollContainer>
  )
}
