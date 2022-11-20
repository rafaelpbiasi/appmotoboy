import styled from 'styled-components'

export const Row = styled.View`
  align-items: ${({ align }) => align || 'center'};
  justify-content: ${({ justify }) => justify || 'flex-start'};
  width: ${({ w, wp, theme }) =>
    w ? `${theme.metrics.px(w)}px` : wp ? `${wp}%` : '100%'};
  margin-top: ${({ theme, mt }) => theme.metrics.px(mt || 0)}px;
  margin-bottom: ${({ theme, mb }) => theme.metrics.px(mb || 0)}px;
  margin-left: ${({ theme, ml }) => theme.metrics.px(ml || 0)}px;
  margin-right: ${({ theme, mr }) => theme.metrics.px(mr || 0)}px;
  flex-direction: row;
  border-radius: ${({ border }) => border || 0}px;
  background-color: ${({ bg, theme }) => theme.colors[bg || 'transparent']};
`

export const Divisor = styled.View`
  border-width: 1px;
  border-color: ${({ bc, theme }) => theme.colors[bc || 'green']};
  width: ${({ w, wp, theme }) =>
    w ? `${theme.metrics.px(w)}px` : wp ? `${wp}%` : '100%'};
  margin-top: ${({ theme, mt }) => theme.metrics.px(mt || 0)}px;
  margin-bottom: ${({ theme, mb }) => theme.metrics.px(mb || 0)}px;
  margin-left: ${({ theme, ml }) => theme.metrics.px(ml || 0)}px;
  margin-right: ${({ theme, mr }) => theme.metrics.px(mr || 0)}px;
`
