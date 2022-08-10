import styled from 'styled-components'

export const CardImage = styled.Image`
  height: ${({ h, hp, theme }) =>
    h ? `${theme.metrics.px(h)}px` : hp ? `${hp}%` : '80px'};
  width: ${({ w, wp, theme }) =>
    w ? `${theme.metrics.px(w)}px` : wp ? `${wp}%` : '80px'};
  border-radius: ${({ theme, border }) => theme.metrics.px(border || 20)}px;
  margin-top: ${({ theme, mt }) => theme.metrics.px(mt || 0)}px;
  margin-bottom: ${({ theme, mb }) => theme.metrics.px(mb || 0)}px;
  margin-left: ${({ theme, ml }) => theme.metrics.px(ml || 0)}px;
  margin-right: ${({ theme, mr }) => theme.metrics.px(mr || 0)}px;
`
