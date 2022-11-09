export interface ChallengeStatisticsInterface {
  currentStreak: number;
  maxStreak: number;
  guesses: {
    [key: number]: number;
    fail: number;
  };
  winPercentage: number;
  gamesPlayed: number;
  gamesWon: number;
  averageGuesses: number;
}
