import { ROUTES_PATH_CHALLENGE } from "constants/Routes"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 36px;
`

const ChallengeBtn = styled.button`
  background-color: ${props => props.theme.accentColor};
  border: none;
  color: ${props => props.theme.boxBgColor};
  padding: 10px;
  background-color: ${props => props.theme.accentColor};
  border-radius: 5px;
  cursor: pointer;
`

export const HomePage = () => {
  const navigate = useNavigate();

  const goChallenge = () => {
    navigate(ROUTES_PATH_CHALLENGE);
  }

  return (
    <Container>
      Version : Beta
      <ChallengeBtn onClick={goChallenge}>Go to Challenge</ChallengeBtn>
    </Container>
  )
}