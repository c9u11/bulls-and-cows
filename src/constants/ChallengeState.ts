import { ChallengeStateInterface } from "interfaces/ChallengeState";
import { GAME_STATE } from "./Game";

export const LOCAL_STORAGE_KEY = "ChallengeState";
export const CHALLENGE_DIGIT = 4;
export const CHALLENGE_UNIQUE = true;

export const DEFAULT_STATE: ChallengeStateInterface = {
  boardState: [],
  gameStatus: GAME_STATE.PROGRESS,
  lastPlayedTs: 0,
  lastCompletedTs: 0,
  lastStartedTs: 0,
  hardMode: false,
  answer: "",
};
