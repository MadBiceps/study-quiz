export interface TeamBoardScore {
  currentScore: number;
  scoreOverTime: {
    time: Date;
    value: number;
  }[];
}