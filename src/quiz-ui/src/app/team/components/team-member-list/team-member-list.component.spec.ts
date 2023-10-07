import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamMemberListComponent } from './team-member-list.component';

describe('TeamMemberListComponent', () => {
  let component: TeamMemberListComponent;
  let fixture: ComponentFixture<TeamMemberListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeamMemberListComponent]
    });
    fixture = TestBed.createComponent(TeamMemberListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
