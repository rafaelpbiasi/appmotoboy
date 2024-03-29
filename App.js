import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'react-native'
import { Routes } from './src/routers'
import { ThemeProvider } from 'styled-components'
import { theme } from './src/styles'
import Toast from 'react-native-toast-message'
import { AuthProvider } from './src/contexts/auth'
import { LogBox } from 'react-native'
import * as Notifications from 'expo-notifications'

export default function App() {
  LogBox.ignoreAllLogs()
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  })

  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <StatusBar
            translucent
            backgroundColor={'#FFFFFF'}
            barStyle="dark-content"
          />
          <Routes />
          <Toast />
        </AuthProvider>
      </ThemeProvider>
    </NavigationContainer>
  )
}
