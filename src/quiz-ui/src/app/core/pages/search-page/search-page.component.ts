import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, from, map } from 'rxjs';
import { Quiz } from '../../models/quiz.model';
import { QuizService } from 'src/app/services/quiz.service';
import { TeamService } from 'src/app/services/team.service';
import { Team } from 'src/app/team/models/team.model';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent {
  public searchTerm = '';

  public quizzesSearchResults$: Observable<Quiz[]> | undefined;

  public teamsSearchResults$: Observable<Team[]> | undefined;

  public usersSearchResults$ = from([
    [{
      id: 'User 1',
      name: 'User 1',
      email: 'test@test.com',
      team: 'Team 1',
    }, {
      id: 'User 2',
      name: 'User 2',
      email: 'test@test.com',
      team: 'Team 2',
    }, {
      id: 'User 3',
      name: 'User 3',
      email: 'test@test.com',
      team: 'Team 3',
    }]
  ]);

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    private teamService: TeamService
  ) {
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['search'];
      this.quizzesSearchResults$ = this.quizService.get(params['search'], undefined, undefined).pipe(map(x => x as Quiz[]));
      this.teamsSearchResults$ = this.teamService.get(params['search'], undefined, undefined).pipe(map(x => x as Team[]));
    });
  }
}
