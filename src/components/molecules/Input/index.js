import React, { useState } from 'react'
import { ContainerInput, InputContainer, InputText } from './styles'
import { Text, Row } from '../../atoms'
import { TextErrors } from '../TextErrors'

export const Input = (props) => {
  const [focus, setFocus] = useState()

  const {
    label,
    placeholder,
    mt,
    mb,
    ml,
    mr,
    innerRef,
    messageError,
    wContainer,
    wpContainer,
    w,
    wp,
  } = props
  return (
    <InputContainer
      w={wContainer}
      wp={wpContainer}
      mt={mt}
      mb={mb}
      ml={ml}
      mr={mr}
    >
      <ContainerInput wp={wp} w={w}>
        <Row>
          <Text align="left" size="20" ml="10" weight="500">
            {label}
          </Text>
        </Row>
        <InputText
          {...props}
          ref={innerRef}
          placeholder={placeholder}
          onFocus={() => {
            setFocus(true)
          }}
          border={messageError ? 'red' : focus && 'greenDark'}
          onBlur={() => {
            setFocus(false)
          }}
        />
        <TextErrors mt="5" message={messageError} />
      </ContainerInput>
    </InputContainer>
  )
}
