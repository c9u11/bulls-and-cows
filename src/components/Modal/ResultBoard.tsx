import { Fireworks } from "fireworks-js/dist/react";
import styled from "styled-components";
import { getChallengeState } from "util/ChallengeState";
import { getChallengeStatistics } from "util/ChallengeStatistics";

interface LabelValueInterface {
  label: string;
  value: string | number;
}

const Center = styled.div`
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

const GraphBar = ({ label, value }: LabelValueInterface) => {
  const Wrapper = styled.div`
    display: flex;
    flex:1;
    align-items: center;
    justify-content: start;
    flex-direction: row;
    padding: 0px 80px;
    gap: 20px;
  `
  const Label = styled.span`
    width: 10px;
    font-weight: bold;
    color: ${props => props.theme.textColor};
    text-align: center;
    &.value {
      font-size: 28px;
    }
    &.label {
      font-size: 14px;
    }
  `
  const Bar = styled.div`
    height: 20px;
    width: 40px;
    background-color: ${props => props.theme.accentColor};
  `
  return (
    <Wrapper>
      <Label>{label}</Label>
      <Bar></Bar>
    </Wrapper>
  )
}

const Panel = ({ label, value }: LabelValueInterface) => {
  const Wrapper = styled.div`
    display: flex;
    flex:1;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    flex:1;
  `
  const Span = styled.span`
    font-weight: bold;
    color: ${props => props.theme.textColor};
    text-align: center;
    &.value {
      font-size: 28px;
    }
    &.label {
      font-size: 14px;
    }
  `
  return (
    <Wrapper>
      <Span className="value">{value}</Span>
      <Span className="label">{label}</Span>
    </Wrapper>
  )
}

const style = {
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  position: "fixed",
  background: "#0000",
  zIndex: -1,
};

const options = {
  speed: 3,
};

export const ResultBoard = () => {
  const challengeState = getChallengeState();
  const challengeStatistics = getChallengeStatistics();


  return (
    <>
      <Fireworks options={options} style={style as React.CSSProperties} />
      <Center className="col" style={{ gap: "50px" }}>
        <Center className="col">
          <Title>
            STATISTICS
          </Title>
          <Center className="row">
            <Panel label="Played" value={challengeStatistics.gamesPlayed}></Panel>
            <Panel label="Win %" value={challengeStatistics.winPercentage}></Panel>
            <Panel label="Current Streak" value={challengeStatistics.currentStreak}></Panel>
            <Panel label="Max Streak" value={challengeStatistics.maxStreak}></Panel>
          </Center>
        </Center>
        <Center className="col">
          <Title>
            GUESS DISTRIBUTION
          </Title>
          <Center className="col" style={{ gap: "20px" }}>
            {
              Object.entries(challengeStatistics.guesses).map(data => {
                const [key, val] = data;
                if (isNaN(+key)) return;
                return (
                  <Center className="row">
                    <GraphBar label={key} value={val}></GraphBar>
                  </Center>
                )
              })
            }
          </Center>
        </Center>
      </Center>
    </>
  );
};
