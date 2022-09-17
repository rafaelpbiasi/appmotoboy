import React from 'react'
import { colors } from '../../../styles/colors'
import Icon from 'react-native-vector-icons/FontAwesome'

import { Styles, TabArea, TabItem } from './styles'

export const CustomTabBar = ({ state, navigation }) => {
  const goTo = (screenName) => {
    navigation.navigate(screenName)
  }

  return (
    <TabArea style={Styles.ShadowStyle}>
      <TabItem onPress={() => goTo('SearchMotoboy')}>
        <Icon
          name="home"
          size={35}
          color={state.index === 0 ? colors.green : 'white'}
        />
      </TabItem>
      <TabItem onPress={() => goTo('RegisterDelivery')}>
        <Icon
          name="plus"
          size={35}
          color={state.index === 1 ? colors.green : 'white'}
        />
      </TabItem>

      <TabItem onPress={() => goTo('ManageDelivery')}>
        <Icon
          name="pencil"
          size={35}
          color={state.index === 2 ? colors.green : 'white'}
        />
      </TabItem>
      <TabItem onPress={() => goTo('Perfil')}>
        <Icon
          name="user"
          size={35}
          color={state.index === 3 ? colors.green : 'white'}
        />
      </TabItem>
    </TabArea>
  )
}
