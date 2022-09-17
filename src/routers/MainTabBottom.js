import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { CustomTabBar } from '../components'
import {
  SearchMotoboy,
  ManageDelivery,
  RegisterDelivery,
  Perfil,
} from '../pages/'

const Tab = createBottomTabNavigator()

export default ({}) => (
  <Tab.Navigator
    screenOptions={({ navigation }) => ({
      tabBarHideOnKeyboard: true,
      headerShown: false,
    })}
    tabBar={(props) => <CustomTabBar {...props} />}
  >
    <Tab.Screen name="SearchMotoboy" component={SearchMotoboy} />
    <Tab.Screen name="RegisterDelivery" component={RegisterDelivery} />
    <Tab.Screen name="ManageDelivery" component={ManageDelivery} />
    <Tab.Screen name="Perfil" component={Perfil} />
  </Tab.Navigator>
)
