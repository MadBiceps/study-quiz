import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizScoreGraphCardComponent } from './quiz-score-graph-card.component';

describe('QuizScoreGraphCardComponent', () => {
  let component: QuizScoreGraphCardComponent;
  let fixture: ComponentFixture<QuizScoreGraphCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizScoreGraphCardComponent]
    });
    fixture = TestBed.createComponent(QuizScoreGraphCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
