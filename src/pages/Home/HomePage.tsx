import styled from "styled-components"
import BaseLayout from "../../components/BaseLayout"

const Container = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.bgColor};
`

export const HomePage = () => {
  return (
    <>
      <BaseLayout />
      <Container>
        <span>tes123t</span>
      </Container>
    </>
  )
}