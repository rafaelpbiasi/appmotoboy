import React from 'react'
import { ContainerTextError } from './styles'
import { Text } from '../../atoms/Text'

export const TextErrors = (props) => {
  const { message, mt, mb, ml, mr } = props
  return (
    <ContainerTextError mt={mt} mb={mb} ml={ml} mr={mr}>
      <Text color="red" weight="bold" size="15">
        {message}
      </Text>
    </ContainerTextError>
  )
}
