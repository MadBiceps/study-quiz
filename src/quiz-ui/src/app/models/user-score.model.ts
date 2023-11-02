export interface UserScore {
  monthlyScore: number;
  teamScore?: number;
  timeScore: {
    time: Date;
    value: number;
  }[];
}