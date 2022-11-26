import React from 'react'
import { ContainerModal, Modal, ModalView } from './styles'
import { CardImage, Row } from '../../atoms'
import Icon from 'react-native-vector-icons/AntDesign'
import { colors } from '../../../styles/colors'
import { TouchableOpacity } from 'react-native'
import { Button } from '../Button'

export default class ModalAsync extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
    }

    this.promiseInfo = {}
  }

  show = async () => {
    return new Promise((resolve, reject) => {
      this.promiseInfo = {
        resolve,
        reject,
      }
      this.setState({
        show: true,
      })
    })
  }

  hide = () => {
    this.setState({
      show: false,
    })
  }

  render() {
    const { show } = this.state
    const { resolve, reject } = this.promiseInfo
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={show}
        statusBarTranslucent
      >
        <ContainerModal>
          <ModalView>
            <Row justify="flex-end" wp="90" mb="40" mt="20">
              <TouchableOpacity
                onPress={() => {
                  reject()
                  this.hide()
                }}
              >
                <Icon name="closecircleo" size={30} color={colors.green} />
              </TouchableOpacity>
            </Row>
            {this.props.children}
            <Row wp="90" mt="20" mb="40" justify="space-between">
              <Button
                wp="45"
                borderColor="red"
                bg="red"
                onPress={() => {
                  reject()
                  this.hide()
                }}
              >
                Não
              </Button>
              <Button
                wp="45"
                onPress={() => {
                  resolve()
                }}
              >
                Sim
              </Button>
            </Row>
          </ModalView>
        </ContainerModal>
      </Modal>
    )
  }

  getResolve() {
    const { resolve = () => {} } = this.promiseInfo || {}
    return (result) => {
      resolve(result)
      this.hide()
    }
  }

  getReject() {
    const { reject = () => {} } = this.promiseInfo || {}
    return (err) => {
      reject(err)
      this.hide()
    }
  }
}
