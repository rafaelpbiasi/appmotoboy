import { StyleSheet } from 'react-native'
import styled from 'styled-components'

export const TabArea = styled.View`
  height: ${({ theme, size }) => theme.metrics.px(75)}px;
  background-color: ${({ theme }) => theme.colors.greenDark};
  flex-direction: row;
  border-top-right-radius: ${({ theme, size }) => theme.metrics.px(20)}px;
  border-top-left-radius: ${({ theme, size }) => theme.metrics.px(20)}px;
`
export const TabItem = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`

// !Style para fazer shadow
export const Styles = StyleSheet.create({
  ShadowStyle: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 10,
    zIndex: 1,
  },
})
