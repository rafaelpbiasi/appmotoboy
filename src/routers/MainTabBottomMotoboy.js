import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { CustomTabBarMotoboy } from '../components'
import { Perfil, YourDelivery, SearchDelivery } from '../pages'

const Tab = createBottomTabNavigator()

export default ({}) => (
  <Tab.Navigator
    screenOptions={({ navigation }) => ({
      tabBarHideOnKeyboard: true,
      headerShown: false,
    })}
    tabBar={(props) => <CustomTabBarMotoboy {...props} />}
  >
    <Tab.Screen name="SearchDelivery" component={SearchDelivery} />
    <Tab.Screen name="YourDelivery" component={YourDelivery} />
    <Tab.Screen name="Perfil" component={Perfil} />
  </Tab.Navigator>
)
