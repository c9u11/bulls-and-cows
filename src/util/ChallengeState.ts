import {
  CHALLENGE_DIGIT,
  DEFAULT_STATE,
  LOCAL_STORAGE_KEY,
} from "constants/ChallengeState";
import { ChallengeStateInterface } from "interfaces/ChallengeState";
import { randomNum } from "./Math";
import { CHALLENGE_UNIQUE } from "../constants/ChallengeState";
import { dateToYYYYMMDD } from "./Date";
import { GAME_STATE } from "constants/Game";

function initChallengeState(prev = DEFAULT_STATE) {
  const challengeState: ChallengeStateInterface = {
    ...prev,
    boardState: [],
    gameStatus: GAME_STATE.PROGRESS,
    lastStartedTs: new Date().getTime(),
    answer: randomNum(CHALLENGE_DIGIT, CHALLENGE_UNIQUE),
  };
  return challengeState;
}

export function getChallengeState() {
  let challengeState: ChallengeStateInterface;
  try {
    const challengeStateString = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    challengeState =
      (challengeStateString && JSON.parse(challengeStateString)) ||
      DEFAULT_STATE;
    if (
      dateToYYYYMMDD(new Date(challengeState.lastPlayedTs)) !==
      dateToYYYYMMDD(new Date())
    )
      challengeState = initChallengeState(challengeState);
  } catch {
    challengeState = initChallengeState();
  }
  return setChallengeState(challengeState);
}

export function setChallengeState(challengeState: ChallengeStateInterface) {
  const currentTime = new Date().getTime();
  challengeState.lastPlayedTs = currentTime;
  if (challengeState.answer === challengeState.boardState.at(-1)) {
    challengeState.lastCompletedTs = currentTime;
    challengeState.gameStatus = GAME_STATE.SUCCESS;
  }
  window.localStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify(challengeState)
  );
  return challengeState;
}
