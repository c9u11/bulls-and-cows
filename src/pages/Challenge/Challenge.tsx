import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components"
import { modalAtom } from "../../atom/modalAtom";
import { BlankRow } from "../../components/Content/BlankRow";
import { EditableRow } from "../../components/Content/EditableRow";
import { NumberKeyboard } from "../../components/Content/NumberKeyboard";
import { ResultRow } from "../../components/Content/ResultRow";
import { dateToYYYYMMDD, randomNum } from "../../util";

interface ChallengeStateInterface {
  "boardState": string[]
  "gameStatus": string
  "lastPlayedTs": number
  "lastCompletedTs": number
  "hardMode": boolean
}
const Container = styled.div`
  display:flex;
  width: 100%;
  flex-grow: 1;
`
const Game = styled.div`
  display:flex;
  max-width: var(--game-max-width);
  margin: var(--default-gap) auto;
  flex-direction: column;
  flex-grow: 1;
`

const Board = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  gap: var(--default-gap);
`

const digitNum = 4;
const isUnique = true;

const answer = randomNum(digitNum, isUnique);

const DEFAULT_STATE: ChallengeStateInterface = {
  "boardState": [],
  "gameStatus": "IN_PROGRESS",
  "lastPlayedTs": 1650124265706,
  "lastCompletedTs": 1650124265706,
  "hardMode": false
}

const ChallengeStateString = window.localStorage.getItem("ChallengeState");
const ChallengeStateJson: ChallengeStateInterface = (ChallengeStateString && JSON.parse(ChallengeStateString)) || DEFAULT_STATE;
const focusFunc = (e: React.MouseEvent) => {
  if ((e.target as HTMLElement).tagName !== "INPUT" || (e.target as HTMLInputElement).disabled)
    document.getElementById("focusEl")?.focus()
};
export const Challenge = () => {
  const setModal = useSetRecoilState(modalAtom);
  const [result, setResult] = useState<string[]>([]);
  useEffect(() => {
    setResult(() => {
      let boardState: string[] = ChallengeStateJson.boardState;
      if (new Date(ChallengeStateJson.lastPlayedTs).getDate() !== new Date().getDate()) boardState = [];
      return boardState;
    });
  }, []);
  useEffect(() => {
    if (result.length && result.length !== ChallengeStateJson.boardState.length) {
      const currentTime = new Date().getTime();
      ChallengeStateJson.boardState = result;
      ChallengeStateJson.lastPlayedTs = currentTime;
      if (result.indexOf(answer) !== -1) ChallengeStateJson.lastCompletedTs = currentTime;
      window.localStorage.setItem("ChallengeState", JSON.stringify(ChallengeStateJson));
    }
    if (dateToYYYYMMDD(new Date(ChallengeStateJson.lastCompletedTs)) === dateToYYYYMMDD(new Date())) {
      setTimeout(() => { setModal("test"); }, 2000)
    }
  }, [result, setModal])
  return (
    <Container onClick={focusFunc}>
      <Game>
        <Board>
          {
            result.map((v, i) => (
              <ResultRow key={`ResultRow${i}`} result={v} answer={answer}></ResultRow>
            ))
          }
          {
            new Array(5 - result.length).fill(" ").map((v, i) =>
              (!i && result.indexOf(answer) === -1) ?
                <EditableRow key={`EditableRow${0}`} digitNum={digitNum} unique={isUnique} setResult={setResult}></EditableRow> : <BlankRow key={`BlankRow${i}`} digitNum={digitNum}></BlankRow>
            )
          }
        </Board>
        <NumberKeyboard></NumberKeyboard>
      </Game>
    </Container>
  );
}