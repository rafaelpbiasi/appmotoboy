import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  Login,
  RecoverPassword,
  NewPassword,
  Register,
  ConfirmTerms,
} from '../pages'

export function MainAuth() {
  const Stack = createNativeStackNavigator()
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={Login} />

      <Stack.Screen name="RecoverPassword" component={RecoverPassword} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="NewPassword" component={NewPassword} />
      <Stack.Screen name="ConfirmTerms" component={ConfirmTerms} />
    </Stack.Navigator>
  )
}
