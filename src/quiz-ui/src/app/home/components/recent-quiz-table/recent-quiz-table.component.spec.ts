import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentQuizTableComponent } from './recent-quiz-table.component';

describe('RecentQuizTableComponent', () => {
  let component: RecentQuizTableComponent;
  let fixture: ComponentFixture<RecentQuizTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecentQuizTableComponent]
    });
    fixture = TestBed.createComponent(RecentQuizTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
