import { useEffect, useState } from "react";
import styled from "styled-components"
import { EditableRow } from "../../components/Content/EditableRow";
import { NumberKeyboard } from "../../components/Content/NumberKeyboard";
import { ResultRow } from "../../components/Content/ResultRow";
import { randomNum } from "../../util";

interface ChallengeStateInterface {
  "boardState": string[]
  "gameStatus": string
  "lastPlayedTs": number
  "lastCompletedTs": number
  "hardMode": boolean
}

const Container = styled.div`
  display:flex;
  flex-direction: column;
  padding: 16px 0px;
  gap: 16px;
  flex-grow: 1;
`

const digitNum = 4;
const isUnique = true;

const answer = randomNum(digitNum, isUnique);
// const answer = "0517";

const DEFAULT_STATE: ChallengeStateInterface = {
  "boardState": [],
  "gameStatus": "IN_PROGRESS",
  "lastPlayedTs": 1650124265706,
  "lastCompletedTs": 1650124265706,
  "hardMode": false
}

const ChallengeStateString = window.localStorage.getItem("ChallengeState");
const ChallengeStateJson: ChallengeStateInterface = (ChallengeStateString && JSON.parse(ChallengeStateString)) || DEFAULT_STATE;

export const Challenge = () => {
  const [result, setResult] = useState<string[]>([]);
  useEffect(() => {
    setResult(() => {
      let boardState: string[] = ChallengeStateJson.boardState;
      if (new Date(ChallengeStateJson.lastPlayedTs).getDate() !== new Date().getDate()) boardState = [];
      return boardState;
    });
  }, [])
  if (result.length && result.length != ChallengeStateJson.boardState.length) {
    const currentTime = new Date().getTime();
    ChallengeStateJson.boardState = result;
    ChallengeStateJson.lastPlayedTs = currentTime;
    if (result[result.length - 1] === answer)
      ChallengeStateJson.lastCompletedTs = currentTime;
    window.localStorage.setItem("ChallengeState", JSON.stringify(ChallengeStateJson));
    console.log(ChallengeStateJson);
  }
  return (
    <Container onClick={(e) => { if ((e.target as HTMLElement).tagName !== "INPUT") document.getElementById("focusEl")?.focus() }}>
      {
        result.map((v, i) => (
          <ResultRow key={`ResultRow${i}`} result={v} answer={answer}></ResultRow>
        ))
      }
      {
        result.indexOf(answer) === -1 ? <EditableRow digitNum={digitNum} unique={isUnique} setResult={setResult}></EditableRow> : null
      }
      <NumberKeyboard></NumberKeyboard>
    </Container>
  );
}