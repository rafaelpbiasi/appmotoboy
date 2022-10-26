import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { createContext, useState, useEffect } from 'react'
import { login } from '../services/usuario'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    async function loadStoragedData() {
      const storageUser = await AsyncStorage.getItem('usuario')

      if (storageUser) {
        setUser(JSON.parse(storageUser))
      }
    }
    loadStoragedData()
  }, [])

  async function signIn(dadosLogin) {
    const response = await login(dadosLogin)

    if (response.status === 200) {
      const usuarioLogado = response.data.usuario
      await AsyncStorage.setItem('usuario', JSON.stringify(usuarioLogado))
      setUser(usuarioLogado)
    }
    return response
  }

  async function signOut() {
    await AsyncStorage.removeItem('usuario')
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{ logado: !!user, usuario: user, signOut, signIn }}
    >
      {children}
    </AuthContext.Provider>
  )
}
export default AuthContext
