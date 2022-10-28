import React from 'react'
import { ContainerModal, Modal, ModalView } from './styles'
import { CardImage, Row } from '../../atoms'
import Icon from 'react-native-vector-icons/AntDesign'
import { colors } from '../../../styles/colors'
import { TouchableOpacity } from 'react-native'

export const ModalImage = ({ show, setShow, image }) => {
  const handleCloseButton = () => {
    setShow(false)
  }
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={show}
      statusBarTranslucent
    >
      <ContainerModal>
        <ModalView>
          <Row justify="flex-end" wp="90" mb="40">
            <TouchableOpacity onPress={handleCloseButton}>
              <Icon name="closecircleo" size={30} color={colors.white} />
            </TouchableOpacity>
          </Row>
          <CardImage
            source={{
              uri: image,
            }}
            w="350"
            h="350"
            resizeMode="cover"
          />
        </ModalView>
      </ContainerModal>
    </Modal>
  )
}
