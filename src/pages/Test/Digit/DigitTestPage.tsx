import styled from "styled-components"

const Container = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.bgColor};
`

export const DigitTestPage = () => {
  return (
    <Container>
      <span>tes123t</span>
    </Container>
  )
}