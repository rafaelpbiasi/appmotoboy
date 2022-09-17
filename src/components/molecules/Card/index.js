import styled from 'styled-components'

export const Card = styled.View`
  align-items: ${({ align }) => align || 'center'};
  justify-content: ${({ justify }) => justify || 'flex-start'};
  width: ${({ w, wp, theme }) =>
    w ? `${theme.metrics.px(w)}px` : wp ? `${wp}%` : '90%'};
  margin-top: ${({ theme, mt }) => theme.metrics.px(mt || 0)}px;
  margin-bottom: ${({ theme, mb }) => theme.metrics.px(mb || 0)}px;
  margin-left: ${({ theme, ml }) => theme.metrics.px(ml || 0)}px;
  margin-right: ${({ theme, mr }) => theme.metrics.px(mr || 0)}px;
  flex-direction: column;
  border: 2px solid ${({ theme }) => theme.colors.greenDark};
  border-radius: 45%;
  padding: ${({ theme }) => theme.metrics.px(20)}px
    ${({ theme }) => theme.metrics.px(36)}px;
  background-color: ${({ bg, theme }) => theme.colors[bg || 'transparent']};
`
