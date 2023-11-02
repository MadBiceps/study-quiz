import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpParams } from '@angular/common/http';
import { QuizAttempt } from '../core/models/quiz-attempt';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizAttemptService {

  constructor(
    private apiService: ApiService
  ) { }

  public get(searchTerm: string | undefined, page: number | undefined, pageSize: number | undefined) {
    // TODO: Implement http params
    return this.apiService.MakeSecureGetRequest<QuizAttempt[]>('v1/quiz-attempts').pipe(map(x => x.body));
  }

  public getById(id: string) {
    return this.apiService.MakeSecureGetRequest<QuizAttempt>('v1/quiz-attempts/' + id).pipe(map(x => x.body));
  }

  public getByTeam(teamId: string) {
    return this.apiService.MakeSecureGetRequest<QuizAttempt[]>('v1/quiz-attempts/team/' + teamId).pipe(map(x => x.body));
  }
  
  public getByQuiz(quizId: string) {
    return this.apiService.MakeSecureGetRequest<QuizAttempt[]>('v1/quiz-attempts/quiz/' + quizId).pipe(map(x => x.body));
  }

  public create(quizId: string) {
    return this.apiService.MakeSecurePostRequest<QuizAttempt>('v1/quiz-attempts', {
      quizId: quizId
    }).pipe(map(x => x.body));
  }

  public update(attemptId: string, questionId: string, answerId: string) {
    return this.apiService.MakeSecurePutRequest<QuizAttempt>('v1/quiz-attempts/' + attemptId, {
      questionId: questionId,
      answerId: answerId
    }).pipe(map(x => x.body));
  }
}
