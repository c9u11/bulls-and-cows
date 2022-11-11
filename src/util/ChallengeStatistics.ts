import {
  DEFAULT_STATISTICS,
  LOCAL_STORAGE_KEY,
} from "constants/ChallengeStatistics";
import { ChallengeStatisticsInterface } from "interfaces/ChallengeStatistics";

function initChallengeStistics() {
  return setChallengeStatistics(DEFAULT_STATISTICS);
}

export function getChallengeStistics() {
  let challengeStatistics: ChallengeStatisticsInterface;
  try {
    const challengeStatisticsString =
      window.localStorage.getItem(LOCAL_STORAGE_KEY);
    challengeStatistics =
      (challengeStatisticsString && JSON.parse(challengeStatisticsString)) ||
      DEFAULT_STATISTICS;
  } catch {
    challengeStatistics = initChallengeStistics();
  }
  return challengeStatistics;
}

export function setChallengeStatistics(
  challengeStatistics: ChallengeStatisticsInterface
) {
  const currentTime = new Date().getTime();
  window.localStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify(challengeStatistics)
  );
  return challengeStatistics;
}
