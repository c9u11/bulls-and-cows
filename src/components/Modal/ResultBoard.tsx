import { CHALLENGE_LIFE, GAME_STATE } from "constants/Game";
import { Fireworks } from "fireworks-js/dist/react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { copyChallengeState, getChallengeState } from "util/ChallengeState";
import { getChallengeStatistics } from "util/ChallengeStatistics";

interface LabelValueInterface {
  label: string;
  value: string | number;
  accent?: boolean;
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
  color: ${props => props.theme.boxBgColor};
  min-width: 10px;
  padding: 0px 10px;
  text-align: right;
  background-color: ${props => props.theme.emptyBorderColor};
  &.accent {
    background-color: ${props => props.theme.accentColor};
  }
  `

const GraphBar = ({ label, value, max, accent }: GraphBarInterface) => {
  return (
    <Wrapper>
      <Label>{label}</Label>
      <Bar className={accent ? 'accent' : ''} style={{ width: max === value ? "100%" : `${value / max * 100}%` }}>{value}</Bar>
    </Wrapper>
  )
}

const PanelWrapper = styled.div`
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
const Panel = ({ label, value }: LabelValueInterface) => {
  return (
    <PanelWrapper>
      <Span className="value">{value}</Span>
      <Span className="label">{label}</Span>
    </PanelWrapper>
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

const ShareBtn = styled.button`
    cursor: pointer;
    position: absolute;
    padding: 0.5rem 1rem;
    border: none;
    border-radius:0.6rem;
    background-color: ${props => props.theme.accentColor};
    color: ${props => props.theme.boxBgColor};
    font-size: 20px;
  `

export const ResultBoard = () => {
  const challengeState = getChallengeState();
  const challengeStatistics = getChallengeStatistics();
  const [max, setMax] = useState(0);
  useEffect(() => {
    let max = 0;
    Object.values(challengeStatistics.guesses).forEach(v => { max = max > v ? max : v })
    setMax(max);
  }, [challengeStatistics.guesses])
  return (
    <>
      {challengeState.gameStatus === GAME_STATE.SUCCESS &&
        <Fireworks options={options} style={style as React.CSSProperties} />
      }
      <Center className="col" style={{ gap: "50px" }}>
        <Center className="col">
          <Title>
            Today's Result
          </Title>
          <Accent>{challengeState.gameStatus === GAME_STATE.SUCCESS ? challengeState.boardState.length : challengeState.gameStatus}</Accent>
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
              new Array(CHALLENGE_LIFE).fill('').map((_, idx) => {
                return (
                  <Center key={idx + 1} className="row">
                    <GraphBar label={`${idx + 1}`} value={challengeStatistics.guesses[idx + 1] || 0} max={max} accent={challengeState.gameStatus === GAME_STATE.SUCCESS && challengeState.boardState.length === idx + 1}></GraphBar>
                  </Center>
                )
              })
            }
          </Center>
        </Center>
        <Center>
          <ShareBtn onClick={copyChallengeState}>Share Result</ShareBtn>
        </Center>
      </Center>
    </>
  );
};
