import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizScoreCardComponent } from './quiz-score-card.component';

describe('QuizScoreCardComponent', () => {
  let component: QuizScoreCardComponent;
  let fixture: ComponentFixture<QuizScoreCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizScoreCardComponent]
    });
    fixture = TestBed.createComponent(QuizScoreCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
