import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamOverviewPageComponent } from './team-overview-page.component';

describe('TeamOverviewPageComponent', () => {
  let component: TeamOverviewPageComponent;
  let fixture: ComponentFixture<TeamOverviewPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeamOverviewPageComponent]
    });
    fixture = TestBed.createComponent(TeamOverviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
