import styled from 'styled-components'

export const ContainerTextError = styled.View`
  align-items: flex-start;
  justify-content: flex-start;
  text-align: center;
  width: 100%;
  padding-left: 2%;
  padding-right: 2%;
  margin-top: ${({ theme, mt }) => theme.metrics.px(mt || 0)}px;
  margin-bottom: ${({ theme, mb }) => theme.metrics.px(mb || 0)}px;
  margin-left: ${({ theme, ml }) => theme.metrics.px(ml || 0)}px;
  margin-right: ${({ theme, mr }) => theme.metrics.px(mr || 0)}px;
`
