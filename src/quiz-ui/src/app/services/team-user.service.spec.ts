import { TestBed } from '@angular/core/testing';

import { TeamUserService } from './team-user.service';

describe('TeamUserService', () => {
  let service: TeamUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
