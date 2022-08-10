import styled from 'styled-components'

export const InputContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: ${({ theme, mt }) => theme.metrics.px(mt || 0)}px;
  margin-bottom: ${({ theme, mb }) => theme.metrics.px(mb || 0)}px;
  margin-left: ${({ theme, ml }) => theme.metrics.px(ml || 0)}px;
  margin-right: ${({ theme, mr }) => theme.metrics.px(mr || 0)}px;
`

export const ContainerInput = styled.View`
  width: 90%;
`

export const InputText = styled.TextInput.attrs({
  placeholderTextColor: '#9CA3AF',
})`
  margin-top: ${({ theme }) => theme.metrics.px(11)}px;
  background-color: ${({ theme }) => theme.colors.white};
  width: 100%;
  height: 50px;
  border-radius: 12px;
  border: 2px solid ${({ theme, border }) => theme.colors[border || 'green']};
  font-size: 15px;
  color: ${({ theme }) => theme.colors.green};
  padding-left: ${({ theme }) => theme.metrics.px(10)}px;
  padding-right: ${({ theme }) => theme.metrics.px(10)}px;
`
