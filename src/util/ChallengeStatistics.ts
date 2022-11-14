import {
  DEFAULT_STATISTICS,
  LOCAL_STORAGE_KEY,
} from "constants/ChallengeStatistics";
import { ChallengeStatisticsInterface } from "interfaces/ChallengeStatistics";
import { CHALLENGE_LIFE } from "constants/Game";

function initChallengeStistics() {
  return setChallengeStatistics(DEFAULT_STATISTICS);
}

export function getChallengeStatistics() {
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

export function addStatisticsData(result: number) {
  const data = getChallengeStatistics();

  data.gamesPlayed++;
  if (result) {
    data.currentStreak++;
    data.maxStreak =
      data.currentStreak > data.maxStreak ? data.currentStreak : data.maxStreak;
    data.gamesWon++;
    data.guesses[result] ??= 0;
    data.guesses[result]++;
  } else {
    data.guesses.fail++;
  }

  data.winPercentage = data.gamesWon / data.gamesPlayed;

  let sum = 0;
  Object.keys(data.guesses).forEach((v, i) => {
    if (isNaN(+v)) sum += data.guesses.fail * CHALLENGE_LIFE;
    sum += data.guesses[+v] * +v;
  });
  data.averageGuesses = sum / data.gamesPlayed;

  setChallengeStatistics(data);
}