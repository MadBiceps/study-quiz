import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Team } from '../team/models/team.model';
import { Quiz } from '../core/models/quiz.model';
import { map } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(
    private apiService: ApiService
  ) { }

  public get(searchTerm: string | undefined, page: number | undefined, pageSize: number | undefined) {
    let query = new HttpParams();
    if (searchTerm !== undefined && searchTerm !== '') {
      query = query.set('searchTerm', searchTerm);
    }


    if (page !== undefined && pageSize !== undefined) {
      query = query.set('page', page);
      query = query.set('pageSize', pageSize);
    }


    return this.apiService.MakeSecureGetRequest<Quiz[]>('v1/quizzes', query).pipe(map(x => x.body));
  }

  public getById(id: string) {
    return this.apiService.MakeSecureGetRequest<Quiz>('v1/quizzes/' + id).pipe(map(x => x.body));
  }

  public create(quiz: Quiz) {
    return this.apiService.MakeSecurePostRequest<Quiz>('v1/quizzes', {
      title: quiz.title,
      description: quiz.description
    }).pipe(map(x => x.body));
  }

  public update(quiz: Quiz) {
    return this.apiService.MakeSecurePutRequest<Quiz>('v1/quizzes/' + quiz.id, {
      title: quiz.title,
      description: quiz.description
    }).pipe(map(x => x.body));
  }

  public delete(quiz: Quiz) {
    return this.apiService.MakeSecureDeleteRequest<void>('v1/quizzes/' + quiz.id).pipe(map(x => x.body));
  }
}
