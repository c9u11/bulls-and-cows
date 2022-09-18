export interface ChallengeStatisticsInterface {
  currentStreak: number;
  maxStreak: number;
  guesses: {
    "1": number;
    "2": number;
    "3": number;
    "4": number;
    "5": number;
    "6": number;
    fail: number;
  };
  winPercentage: number;
  gamesPlayed: number;
  gamesWon: number;
  averageGuesses: number;
}
