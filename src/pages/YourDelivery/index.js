import React, { useState } from 'react'
import { ScreenScrollContainer, Row, Text } from '../../components/atoms'
import { Button, Card, Input, RadioButton } from '../../components/molecules'
import DropDownPicker from 'react-native-dropdown-picker'
import { colors } from '../../styles/colors'

export function YourDelivery({ navigation }) {
  const [errors, setErrors] = useState({
    Nome: '',
  })
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('T')
  const [items, setItems] = useState([
    { label: 'Todas', value: 'T' },
    { label: 'Pendente', value: 'P' },
    { label: 'Iniciada', value: 'I' },
    { label: 'Finalizada', value: 'F' },
    { label: 'Solicitada', value: 'S' },
  ])

  function validate() {
    var valid = true
    return valid
  }

  return (
    <ScreenScrollContainer
      contentContainerStyle={{
        alignItems: 'center',
      }}
    >
      <Text mt="80" size="35" weight="bold">
        Suas entregas
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
            Nome do contratante
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
            Endereço origem:
          </Text>
        </Row>

        <Row
          justify="space-between"
          mt="10"
          style={{ elevation: 10, zIndex: 10 }}
        >
          <Text size="20" mr="5">
            Endereço Destino:
          </Text>
        </Row>

        <Row
          justify="space-between"
          mt="10"
          style={{ elevation: 10, zIndex: 10 }}
        >
          <Button wp="48" mt="20" bg="greenLight" borderColor="greenLight">
            Abrir GPS
          </Button>
          <Button wp="48" mt="20" bg="greenLight" borderColor="greenLight">
            Finalizar
          </Button>
        </Row>
      </Card>
    </ScreenScrollContainer>
  )
}
