import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'react-native'
import { Routes } from './src/routers'
import { ThemeProvider } from 'styled-components'
import { theme } from './src/styles'

export default function App() {
  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <StatusBar
          translucent
          backgroundColor={'#FFFFFF'}
          barStyle="dark-content"
        />
        <Routes />
      </ThemeProvider>
    </NavigationContainer>
  )
}
