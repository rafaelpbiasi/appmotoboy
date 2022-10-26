import { createNativeStackNavigator } from '@react-navigation/native-stack'
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
} from '../pages'
import MainTabBottom from './MainTabBottom'
import MainTabBottomMotoboy from './MainTabBottomMotoboy'

export function MainRoutes({ telaInicial }) {
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
      <Stack.Screen
        name="RegisterDeliveryMotoboy"
        component={RegisterDeliveryMotoboy}
      />
    </Stack.Navigator>
  )
}
