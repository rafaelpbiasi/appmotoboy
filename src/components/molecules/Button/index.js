import React from 'react'
import { ActivityIndicator } from 'react-native'
import { ButtonContainer } from './styles'
import { Text } from '../../atoms/Text'

export const Button = (props) => {
  const { borderColor, loading, children, weight, color, size, disabled } =
    props
  return (
    <ButtonContainer
      borderColor={borderColor}
      {...props}
      disabled={loading || disabled}
    >
      <Text weight={weight} color={color || 'white'} size={size || 20}>
        {loading ? (
          <ActivityIndicator size="small" color={color || 'white'} />
        ) : (
          children
        )}
      </Text>
    </ButtonContainer>
  )
}
