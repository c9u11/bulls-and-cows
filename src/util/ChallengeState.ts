import {
  CHALLENGE_DIGIT,
  DEFAULT_STATE,
  LOCAL_STORAGE_KEY,
} from "constants/ChallengeState";
import { ChallengeStateInterface } from "interfaces/ChallengeState";
import { randomNum } from "./Math";
import { CHALLENGE_UNIQUE } from "../constants/ChallengeState";
import { isSameDate } from "./Date";
import { CHALLENGE_LIFE, GAME_STATE } from "constants/Game";

function initChallengeState(prev = DEFAULT_STATE) {
  const challengeState: ChallengeStateInterface = {
    ...prev,
    boardState: [],
    gameStatus: GAME_STATE.PROGRESS,
    lastStartedTs: new Date().getTime(),
    answer: randomNum(CHALLENGE_DIGIT, CHALLENGE_UNIQUE),
  };
  return setChallengeState(challengeState);
}

export function getChallengeState() {
  let challengeState: ChallengeStateInterface;
  try {
    const challengeStateString = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    challengeState =
      (challengeStateString && JSON.parse(challengeStateString)) ||
      DEFAULT_STATE;
    if (!isSameDate(new Date(challengeState.lastPlayedTs), new Date()))
      challengeState = initChallengeState(challengeState);
  } catch {
    challengeState = initChallengeState();
  }
  return challengeState;
}

export function setChallengeState(challengeState: ChallengeStateInterface) {
  const currentDate = new Date();
  const lastCompletedDate = new Date(challengeState.lastCompletedTs);
  if (isSameDate(currentDate, lastCompletedDate)) return challengeState;
  const currentTime = currentDate.getTime();
  const isSuccessed =
    challengeState.answer === challengeState.boardState.at(-1);
  const isFailed =
    !isSuccessed && challengeState.boardState.length >= CHALLENGE_LIFE;

  challengeState.lastPlayedTs = currentTime;

  if (isSuccessed) {
    challengeState.lastCompletedTs = currentTime;
    challengeState.gameStatus = GAME_STATE.SUCCESS;
  } else if (isFailed) {
    challengeState.lastCompletedTs = currentTime;
    challengeState.gameStatus = GAME_STATE.FAIL;
  }
  window.localStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify(challengeState)
  );
  return challengeState;
}
