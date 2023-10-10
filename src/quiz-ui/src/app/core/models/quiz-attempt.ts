import { Answer, Question } from "./question.model";
import { Quiz } from "./quiz.model";
import { User } from "./user.model";

export interface QuizAttempt {
  id: string;
  user: User;
  quiz: Quiz;
  attemptAnswers: AttemptAnswer[];
  status: 'inProgress' | 'finished'
}

export interface AttemptAnswer {
  id: string;
  question: Question;
  answer?: Answer;
  resultingScore: number;
}