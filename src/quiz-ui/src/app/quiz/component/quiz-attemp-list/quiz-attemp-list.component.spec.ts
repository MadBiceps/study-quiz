import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizAttempListComponent } from './quiz-attemp-list.component';

describe('QuizAttempListComponent', () => {
  let component: QuizAttempListComponent;
  let fixture: ComponentFixture<QuizAttempListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizAttempListComponent]
    });
    fixture = TestBed.createComponent(QuizAttempListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
