import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Login, Home, RecoverPassword, NewPassword, Register } from '../pages'

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
    </Stack.Navigator>
  )
}
