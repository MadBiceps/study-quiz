import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamScoreChartComponent } from './team-score-chart.component';

describe('TeamScoreChartComponent', () => {
  let component: TeamScoreChartComponent;
  let fixture: ComponentFixture<TeamScoreChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeamScoreChartComponent]
    });
    fixture = TestBed.createComponent(TeamScoreChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
