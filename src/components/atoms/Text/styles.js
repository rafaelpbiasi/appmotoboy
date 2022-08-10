import styled from 'styled-components'

export const CustomText = styled.Text`
  font-size: ${({ theme, size }) => theme.metrics.px(size || 24)}px;
  color: ${({ color, theme }) => theme.colors[color || 'green']};
  margin-top: ${({ theme, mt }) => theme.metrics.px(mt || 0)}px;
  margin-bottom: ${({ theme, mb }) => theme.metrics.px(mb || 0)}px;
  margin-left: ${({ theme, ml }) => theme.metrics.px(ml || 0)}px;
  margin-right: ${({ theme, mr }) => theme.metrics.px(mr || 0)}px;
  font-weight: ${({ weight }) => (weight ? weight : '400')};
  text-align: ${({ align }) => (align ? align : 'center')};
  text-decoration: ${({ decoration }) => (decoration ? decoration : 'none')};
`
