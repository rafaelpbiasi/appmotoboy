import AsyncStorage from '@react-native-async-storage/async-storage'
import { useContext, useEffect, useState } from 'react'
import AuthContext from '../contexts/auth'
import { MainRoutes } from '../routers/MainStack'
import { MainAuth } from './MainAuth'

export function Routes() {
  const { logado, usuario } = useContext(AuthContext)

  return logado ? (
    <MainRoutes
      telaInicial={
        usuario.flagtipousuario === 'C'
          ? 'MainTabBottom'
          : 'MainTabBottomMotoboy'
      }
    />
  ) : (
    <MainAuth />
  )
}
