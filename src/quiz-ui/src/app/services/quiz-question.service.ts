import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map } from 'rxjs';
import { Question } from '../core/models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuizQuestionService {

  constructor(
    private apiService: ApiService
  ) { }

  public get(quizId: string) {
    return this.apiService.MakeSecureGetRequest<Question[]>('v1/quizzes/' + quizId + '/questions').pipe(map(x => x.body));
  }

  public getById(quizId: string, questionId: string) {
    return this.apiService.MakeSecureGetRequest<Question>('v1/quizzes/' + quizId + '/questions/' + questionId).pipe(map(x => x.body));
  }

  public create(quizId: string, question: Question) {
    return this.apiService.MakeSecurePostRequest<Question>('v1/quizzes/' + quizId + '/questions', {
      label: question.label,
      hint: question.hint,
      answers: question.answers.map(x => {
        return {
          id: '',
          label: x.label,
          reason: x.reason,
          isCorrect: x.isCorrect
        }
      })
    });
  }

  public update(quizId: string, question: Question) {
    return this.apiService.MakeSecurePostRequest<Question>('v1/quizzes/' + quizId + '/questions/' + question.id, {
      label: question.label,
      hint: question.hint,
      answers: question.answers.map(x => {
        return {
          id: '',
          label: x.label,
          reason: x.reason,
          isCorrect: x.isCorrect
        }
      })
    });
  }

  public delete(quizId: string, questionId: string) {
    return this.apiService.MakeSecureDeleteRequest<void>('v1/quizzes/' + quizId + '/questions/' + questionId);
  }
}
