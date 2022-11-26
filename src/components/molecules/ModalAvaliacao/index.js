import React from 'react'
import { ContainerModal, Modal, ModalView } from './styles'
import { CardImage, Row } from '../../atoms'
import Icon from 'react-native-vector-icons/AntDesign'
import { colors } from '../../../styles/colors'
import { TouchableOpacity } from 'react-native'
import { Button } from '../Button'

export default class ModalAvaliacao extends React.Component {
  constructor(props) {
    super(props)
  }

  hide = () => {
    this.props.setOpen(false)
  }

  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.open}
        statusBarTranslucent
      >
        <ContainerModal>
          <ModalView>
            <Row justify="flex-end" wp="90" mb="40" mt="20">
              <TouchableOpacity
                onPress={() => {
                  this.hide()
                }}
              >
                <Icon name="closecircleo" size={30} color={colors.green} />
              </TouchableOpacity>
            </Row>
            {this.props.children}
            <Row wp="90" mt="20" mb="40" justify="center">
              <Button
                borderColor="green"
                bg="green"
                wp="45"
                onPress={() => {
                  this.props.handleSubmit()
                }}
              >
                Avaliar
              </Button>
            </Row>
          </ModalView>
        </ContainerModal>
      </Modal>
    )
  }
}
