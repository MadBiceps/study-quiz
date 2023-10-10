import { User } from "./user.model";

export interface Question {
  id: string;
  label: string;
  answers: Answer[];
  creator: User;
  createdAt: Date;
  editedBy: User;
  editedAt: Date;
}

export interface Answer {
  id: string;
  label: string;
  reason?: string;
  isCorrect?: boolean;
  creator: User;
  createdAt: Date;
  editedBy: User;
  editedAt: Date;
}