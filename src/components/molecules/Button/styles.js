import styled from 'styled-components'

export const ButtonContainer = styled.TouchableOpacity`
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ bg, theme }) => theme.colors[bg || 'greenDark']};
  border-radius: ${({ theme, border }) => theme.metrics.px(border || 28)}px;
  width: ${({ w, wp, theme }) =>
    w ? `${theme.metrics.px(w)}px` : wp ? `${wp}%` : '100%'};
  height: ${({ theme, h }) => theme.metrics.px(h || 56)}px;
  margin-top: ${({ theme, mt }) => theme.metrics.px(mt || 0)}px;
  margin-bottom: ${({ theme, mb }) => theme.metrics.px(mb || 0)}px;
  margin-left: ${({ theme, ml }) => theme.metrics.px(ml || 0)}px;
  margin-right: ${({ theme, mr }) => theme.metrics.px(mr || 0)}px;
`

export const GenericButton = styled.TouchableOpacity`
  margin-top: ${({ theme, mt }) => theme.metrics.px(mt || 0)}px;
  margin-bottom: ${({ theme, mb }) => theme.metrics.px(mb || 0)}px;
  margin-left: ${({ theme, ml }) => theme.metrics.px(ml || 0)}px;
  margin-right: ${({ theme, mr }) => theme.metrics.px(mr || 0)}px;
`
