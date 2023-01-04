import { GAME_STATE } from "constants/Game"
import styled from "styled-components"
import { getChallengeState } from "util/ChallengeState"

const Box = styled.div`
display: flex;
flex:1;
align-items: center;
justify-content: center;
gap: 20px;
width: 100%;
&.col {
  flex-direction: column;
}
&.row {
  flex-direction: row;
}
`

const Title = styled.h1`
  font-weight: bolder;
  font-size: 20px;
  color : ${props => props.theme.textColor};
`

const Description = styled.span`
  font-size: 16px;
  font-weight: bolder;
  color : ${props => props.theme.emptyBorderColor};
`

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 26px;
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  input:checked + span {
    background-color: ${props => props.theme.accentColor};
  }
  
  input:focus + span {
    box-shadow: 0 0 1px ${props => props.theme.accentColor};
  }
  
  input:checked + span:before {
    -webkit-transform: translateX(22px);
    -ms-transform: translateX(22px);
    transform: translateX(22px);
  }
`

const Slider = styled.span`
position: absolute;
cursor: pointer;
top: 0;
left: 0;
right: 0;
bottom: 0;
background-color: ${props => props.theme.emptyBorderColor};
-webkit-transition: .4s;
transition: .4s;
border-radius: 16px;
&:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 5px;
  bottom: 5px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 50%;
}
`

export const Setting = () => {
  const challengeState = getChallengeState();
  console.log(challengeState);

  return (
    <Box className="col">
      <Box className="col">
        <Title>
          Setting
        </Title>
      </Box>
      <Box style={{ boxSizing: "border-box", width: "100%", padding: "30px" }}>
        <Box className="col" style={{ alignItems: "start" }}>
          <Title>Hard Mode</Title>
          <Description>not position</Description>
        </Box>
        <Switch>
          <input type="checkbox" disabled={challengeState.gameStatus === GAME_STATE.PROGRESS && challengeState.boardState.length !== 0} />
          <Slider></Slider>
        </Switch>
      </Box>

    </Box>
  )
}