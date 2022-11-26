import { Fireworks } from "fireworks-js/dist/react";
import styled from "styled-components";
import { getChallengeState } from "util/ChallengeState";
import { getChallengeStatistics } from "util/ChallengeStatistics";

interface LabelValueInterface {
  label: string;
  value: string | number;
}

interface GraphBarInterface extends LabelValueInterface {
  value: number;
  max: number;
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

const Accent = styled.span`
  font-size: 64px;
  color: ${props => props.theme.accentColor};
`

const GraphBar = ({ label, value, max }: GraphBarInterface) => {
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
  `
  const Bar = styled.div`
    height: 20px;
    background-color: ${props => props.theme.accentColor};
    color: ${props => props.theme.boxBgColor};
    min-width: 10px;
    padding: 0px 10px;
    width: ${max === value ? "100%" : `${value / max * 100}%`};
    text-align: right;
  `
  return (
    <Wrapper>
      <Label>{label}</Label>
      <Bar>{value}</Bar>
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
  let max = 0;
  Object.values(challengeStatistics.guesses).forEach(v => { max = max > v ? max : v })
  return (
    <>
      <Fireworks options={options} style={style as React.CSSProperties} />
      <Center className="col" style={{ gap: "50px" }}>
        <Center className="col">
          <Title>
            Today's Result
          </Title>
          <Accent>{challengeState.boardState.length}</Accent>
        </Center>
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
                if (isNaN(+key)) return null;
                return (
                  <Center className="row">
                    <GraphBar label={key} value={val} max={max}></GraphBar>
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
