import { Answer, Question } from "./question.model";
import { User } from "./user.model";

export interface QuizAttempt {
  id: string;
  quizId: string;
  quizTitle: string
  questions: QuizAttemptQuestion[];
  user: User;
  teamId: string | undefined;
  createdAt: Date;
  finishedAt: Date | undefined;
}

export interface QuizAttemptQuestion {
  id: string;
  order: number;
  question: Question;
  answer: QuizAttemptAnswer;
}

export interface QuizAttemptAnswer {
  id: string;
  answer: Answer;
  answeredAt: Date;
  score: number;
}
