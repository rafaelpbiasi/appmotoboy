import styled from 'styled-components'

export const Column = styled.View`
  align-items: ${({ align }) => align || 'flex-start'};
  width: ${({ w, wp, theme }) =>
    w ? `${theme.metrics.px(w)}px` : wp ? `${wp}%` : '100%'};
  margin-top: ${({ theme, mt }) => theme.metrics.px(mt || 0)}px;
  margin-bottom: ${({ theme, mb }) => theme.metrics.px(mb || 0)}px;
  margin-left: ${({ theme, ml }) => theme.metrics.px(ml || 0)}px;
  margin-right: ${({ theme, mr }) => theme.metrics.px(mr || 0)}px;
  flex-direction: column;
  border-bottom-left-radius: ${({ theme, bbl }) =>
    theme.metrics.px(bbl || 0)}px;
  border-bottom-right-radius: ${({ theme, bbr }) =>
    theme.metrics.px(bbr || 0)}px;

  border-top-left-radius: ${({ theme, btl }) => theme.metrics.px(btl || 0)}px;
  border-top-right-radius: ${({ theme, btr }) => theme.metrics.px(btr || 0)}px;
  background-color: ${({ bg, theme }) => theme.colors[bg || 'transparent']};
`
