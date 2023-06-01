import { Digit } from "components/Content/Digit"
import styled from "styled-components"

const Box = styled.div`
display: flex;
flex:1;
align-items: center;
justify-content: center;
gap: 20px;
width: 100%;
line-height: 20px;
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

export const Help = () => {
  return (
    <Box className="col">
      <Box className="col">
        <Title>
          Game Rules
        </Title>
      </Box>
      <Box style={{ boxSizing: "border-box", width: "100%", padding: "30px" }}>
        <Box className="col" style={{ alignItems: "start" }}>
          Let's guess a number composed of four digits.<br />
          Enter your guess using your keyboard or by clicking on the on-screen keyboard button below.<br />
          When you submit your guess, the cards will flip and change color.<br />
          Refer to the instructions below to guess today's number.<br />
          <Box>
            <Digit
              key={0}
              status={"full"}
              value={"1"}
              index={0}
            ></Digit>
            <Title>A green card signifies a digit in the correct position.</Title>
          </Box>
          <Box>
            <Digit
              key={1}
              status={"half"}
              value={"2"}
              index={1}
            ></Digit>
            <Title>A yellow card signifies a digit that is included in the answer but is not in the right position.</Title>
          </Box>
          <Box>
            <Digit
              key={2}
              status={"empty"}
              value={"3"}
              index={2}
            ></Digit>
            <Title>A grey card signifies a digit that is not included in the answer at all.</Title>
          </Box>
          There are no repeated digits in the answer.<br />
          Try various methods to figure out the answer.<br />
          After you have guessed correctly, share your success with friends and compete with each other.<br />
        </Box>
      </Box>

    </Box>
  )
}