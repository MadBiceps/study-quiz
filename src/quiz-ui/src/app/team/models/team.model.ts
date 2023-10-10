import { User } from "src/app/core/models/user.model";

export interface Team {
  id: string;
  name: string;
  members: TeamMember[] | undefined;
  memberCount: number;
  maxMemberCount: number;
  createdBy: User;
  creationDate: Date;
  scores: TeamScore[] | undefined;
  currentScore: number;
}

export interface TeamMember extends User {
  joined: Date;
  id: string
}

export interface TeamScore {
  id: string;
  score: number;
  date: Date;
  user: User;
}