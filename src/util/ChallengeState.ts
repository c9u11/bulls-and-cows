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
import { addStatisticsData } from "./ChallengeStatistics";
import { dateToYYYYMMDD } from "./Date";
import { toast } from "./Toast";

function initChallengeState(prev = DEFAULT_STATE) {
  const challengeState: ChallengeStateInterface = {
    ...prev,
    boardState: [],
    gameStatus: GAME_STATE.PROGRESS,
    lastStartedTs: new Date().getTime(),
    answer: randomNum(CHALLENGE_DIGIT, CHALLENGE_UNIQUE, true),
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
  const currentTime = currentDate.getTime();
  const isSuccessed =
    challengeState.answer === challengeState.boardState.at(-1);
  const isFailed =
    !isSuccessed && challengeState.boardState.length >= CHALLENGE_LIFE;
  const isFinished = isSuccessed || isFailed;
  challengeState.lastPlayedTs = currentTime;
  if (isFinished && !isSameDate(currentDate, lastCompletedDate)) {
    if (isSuccessed) {
      challengeState.lastCompletedTs = currentTime;
      challengeState.gameStatus = GAME_STATE.SUCCESS;
    } else if (isFailed) {
      challengeState.lastCompletedTs = currentTime;
      challengeState.gameStatus = GAME_STATE.FAIL;
    }
    addStatisticsData(isSuccessed ? challengeState.boardState.length : 0);
  }

  window.localStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify(challengeState)
  );
  return challengeState;
}

export function copyChallengeState() {
  const challengeState = getChallengeState();
  if (challengeState.gameStatus === GAME_STATE.PROGRESS) return;
  let data = `Bulls and Cows\n${dateToYYYYMMDD(
    new Date(challengeState.lastCompletedTs)
  )}\n${challengeState.boardState.length}/${CHALLENGE_LIFE}\n`;
  for (let idx = 0; idx < CHALLENGE_LIFE; idx++) {
    const input = challengeState.boardState[idx];
    for (let digit = 0; digit < CHALLENGE_DIGIT; digit++) {
      if (!input) data += "⬜️";
      else if (input[digit] === challengeState.answer[digit]) data += "🟩";
      else if (challengeState.answer.indexOf(input[digit]) !== -1) data += "🟨";
      else data += "⬛️";
    }
    data += "\n";
  }
  try {
    navigator.clipboard.writeText(data);
    toast("Copied", 1000);
  } catch {
    toast("This browser is not supported.", 2000);
  }
}
