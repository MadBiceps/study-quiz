import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { from } from 'rxjs';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent {
  public searchTerm = '';

  public quizzesSearchResults$ = from(
    [
      [{
        id: 1,
        name: 'Quiz 1',
        description: 'Quiz 1 description'
      }, {
        id: 2,
        name: 'Quiz 2',
        description: 'Quiz 2 description'
      }, {
        id: 3,
        name: 'Quiz 3',
        description: 'Quiz 3 description'
      }]
    ]
  );

  public teamsSearchResults$ = from([
    [{
      id: 'Team 1',
      name: 'Team 1',
      memberCount: 1,
      maxMemberCount: 10,
      createdBy: 'User 1',
      creationDate: new Date()
    }, {
      id: 'Team 2',
      name: 'Team 2',
      memberCount: 2,
      maxMemberCount: 10,
      createdBy: 'User 2',
      creationDate: new Date()
    }, {
      id: 'Team 3',
      name: 'Team 3',
      memberCount: 3,
      maxMemberCount: 10,
      createdBy: 'User 3',
      creationDate: new Date()
    }]
  ]);

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
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.searchTerm = this.route.snapshot.queryParams['search'];
  }
}
