export interface ChallengeStateInterface {
  boardState: string[];
  gameStatus: string;
  lastPlayedTs: number;
  lastCompletedTs: number;
  lastStartedTs: number;
  hardMode: boolean;
  answer: string;
}
