import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  Login,
  Home,
  RecoverPassword,
  NewPassword,
  Register,
  RegisterDelivery,
  SearchDelivery,
  SearchMotoboy,
  ManageDelivery,
  YourDelivery,
  ConfirmTerms,
  Perfil,
  Relatorio,
} from '../pages'

export function MainRoutes() {
  const Stack = createNativeStackNavigator()
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="RecoverPassword" component={RecoverPassword} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="NewPassword" component={NewPassword} />
      <Stack.Screen name="RegisterDelivery" component={RegisterDelivery} />
      <Stack.Screen name="SearchDelivery" component={SearchDelivery} />
      <Stack.Screen name="SearchMotoboy" component={SearchMotoboy} />
      <Stack.Screen name="ManageDelivery" component={ManageDelivery} />
      <Stack.Screen name="YourDelivery" component={YourDelivery} />
      <Stack.Screen name="ConfirmTerms" component={ConfirmTerms} />
      <Stack.Screen name="Perfil" component={Perfil} />
      <Stack.Screen name="Relatorio" component={Relatorio} />
    </Stack.Navigator>
  )
}
