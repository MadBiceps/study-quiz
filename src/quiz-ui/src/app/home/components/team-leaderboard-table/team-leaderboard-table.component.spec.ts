import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamLeaderboardTableComponent } from './team-leaderboard-table.component';

describe('TeamLeaderboardTableComponent', () => {
  let component: TeamLeaderboardTableComponent;
  let fixture: ComponentFixture<TeamLeaderboardTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeamLeaderboardTableComponent]
    });
    fixture = TestBed.createComponent(TeamLeaderboardTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
