import { Question } from "./question.model";
import { QuizAttempt } from "./quiz-attempt";
import { User } from "./user.model";

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  questionCount: number;
  createdAt: Date;
  updatedAt: Date;
  creator: User;
  updatedBy: User;
  attempts: QuizAttempt[];
}