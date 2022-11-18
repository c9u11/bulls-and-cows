import { Fireworks } from "fireworks-js/dist/react";
import styled from "styled-components";
import { getChallengeState } from "util/ChallengeState";
import { getChallengeStatistics } from "util/ChallengeStatistics";


const Center = styled.div`
  display: flex;
  flex:1;
  align-items: center;
  justify-content: center;
  gap: 20px;
  &.col {
    flex-direction: column;
  }
  &.row {
    flex-direction: row;
  }
`

const Title = styled.h1`
  font-weight: bold;
  font-size: 36px;
  color : ${props => props.theme.textColor};
`
const Panel = ({ label, value }: { label: string, value: string | number }) => {
  const Wrapper = styled.div`
    display: flex;
    flex:1;
    align-items: center;
    justify-content: center;
    gap: 5px;
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
      <Center className="col">
        <Title>
          STATISTICS
        </Title>
        <Center className="row" style={{ width: "100%" }}>
          <Panel label="Played" value={challengeStatistics.gamesPlayed}></Panel>
          <Panel label="Win %" value={challengeStatistics.winPercentage}></Panel>
          <Panel label="Current Streak" value={challengeStatistics.currentStreak}></Panel>
          <Panel label="Max Streak" value={challengeStatistics.maxStreak}></Panel>
        </Center>
        <div>
          {JSON.stringify(challengeState)}
          {String(new Date(challengeState.lastCompletedTs))}

          {JSON.stringify(challengeStatistics)}
        </div>
      </Center>
    </>
  );
};
