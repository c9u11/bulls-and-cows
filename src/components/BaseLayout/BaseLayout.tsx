import styled from "styled-components"
import { ThemeChanger } from "./ThemeChanger"

const Container = styled.header`
  display: flex;
  align-items: center;
  background-color: ${props => props.theme.boxBgColor}
`
const Title = styled.h1`
  flex: 1;
  text-align: center;
  font-weight: bold;
  font-size: 36px;
  color : ${props => props.theme.boxTextColor};
`
export const BaseLayout = () => {
  return (
    <Container>
      <ThemeChanger></ThemeChanger>
      <Title>숫자 야구</Title>
    </Container>
  )
}