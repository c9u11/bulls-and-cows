import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components"
import { modalAtom } from "atom/modalAtom";
import { BlankRow } from "components/Content/BlankRow";
import { EditableRow } from "components/Content/EditableRow";
import { NumberKeyboard } from "components/Content/NumberKeyboard";
import { ResultRow } from "components/Content/ResultRow";
import { getChallengeState, setChallengeState } from 'util/ChallengeState';
import { CHALLENGE_DIGIT, CHALLENGE_UNIQUE } from "constants/ChallengeState";
import { GAME_STATE } from "constants/Game";

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

const focusFunc = (e: React.MouseEvent) => {
  if ((e.target as HTMLElement).tagName !== "INPUT" || (e.target as HTMLInputElement).disabled)
    document.getElementById("focusEl")?.focus()
};
let challengeState = getChallengeState();
const answer = challengeState.answer;
export const Challenge = () => {
  const setModal = useSetRecoilState(modalAtom);
  const [result, setResult] = useState<string[]>(challengeState.boardState);
  useEffect(() => {
    challengeState = setChallengeState({
      ...challengeState,
      boardState: result
    });
    if (challengeState.gameStatus === GAME_STATE.SUCCESS) {
      setTimeout(() => { setModal("ResultBoard"); }, 600 * 4 + 300)
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
                <EditableRow key={`EditableRow${0}`} digitNum={CHALLENGE_DIGIT} unique={CHALLENGE_UNIQUE} setResult={setResult}></EditableRow> : <BlankRow key={`BlankRow${i}`} digitNum={CHALLENGE_DIGIT}></BlankRow>
            )
          }
        </Board>
        <NumberKeyboard></NumberKeyboard>
      </Game>
    </Container>
  );
}