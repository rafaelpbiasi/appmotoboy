import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useEffect, useRef, useState } from 'react'
import {
  Home,
  RegisterDelivery,
  SearchDelivery,
  SearchMotoboy,
  ManageDelivery,
  YourDelivery,
  ConfirmTerms,
  Perfil,
  Relatorio,
  RegisterDeliveryMotoboy,
  VisualizarPerfil,
} from '../pages'
import MainTabBottom from './MainTabBottom'
import MainTabBottomMotoboy from './MainTabBottomMotoboy'
import * as Notifications from 'expo-notifications'
import { ConverteNotificacao } from '../utils/utils'
import { useNavigation } from '@react-navigation/native'

export function MainRoutes({ telaInicial }) {
  const [notifications, setNotifications] = useState(null)
  const [count, setCount] = useState(0)
  const navigate = useNavigation()

  const _isMounted = useRef(true)

  useEffect(() => {
    if (_isMounted) {
      Notifications.addNotificationResponseReceivedListener((e) =>
        setNotifications(e)
      )
    }

    return () => {
      _isMounted.current = false
    }
  }, [])

  useEffect(() => {
    if (notifications && count === 0) {
      const data = notifications.notification.request.content.data || null
      setCount(1)
      if (data && data.tela) {
        const page = ConverteNotificacao(data)
        navigate.navigate(page.name, page.options)
      }
    }
    return () => {
      setCount(0)
      _isMounted.current = false
    }
  }, [notifications])

  const Stack = createNativeStackNavigator()
  return (
    <Stack.Navigator
      initialRouteName={telaInicial}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MainTabBottom" component={MainTabBottom} />
      <Stack.Screen
        name="MainTabBottomMotoboy"
        component={MainTabBottomMotoboy}
      />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="RegisterDelivery" component={RegisterDelivery} />
      <Stack.Screen name="SearchDelivery" component={SearchDelivery} />
      <Stack.Screen name="SearchMotoboy" component={SearchMotoboy} />
      <Stack.Screen name="ManageDelivery" component={ManageDelivery} />
      <Stack.Screen name="YourDelivery" component={YourDelivery} />
      <Stack.Screen name="ConfirmTerms" component={ConfirmTerms} />
      <Stack.Screen name="Perfil" component={Perfil} />
      <Stack.Screen name="Relatorio" component={Relatorio} />
      <Stack.Screen name="VisualizarPerfil" component={VisualizarPerfil} />
      <Stack.Screen
        name="RegisterDeliveryMotoboy"
        component={RegisterDeliveryMotoboy}
      />
    </Stack.Navigator>
  )
}
