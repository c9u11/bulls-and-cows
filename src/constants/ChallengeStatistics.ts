import { ChallengeStatisticsInterface } from "../interfaces/ChallengeStatistics";

export const LOCAL_STORAGE_KEY = "ChallengeStatistics";

export const DEFAULT_STATISTICS: ChallengeStatisticsInterface = {
  currentStreak: 0,
  maxStreak: 0,
  guesses: {
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0,
    "5": 0,
    "6": 0,
    fail: 0,
  },
  winPercentage: 0,
  gamesPlayed: 0,
  gamesWon: 0,
  averageGuesses: 0,
};
