import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizTimeLineComponent } from './quiz-time-line.component';

describe('QuizTimeLineComponent', () => {
  let component: QuizTimeLineComponent;
  let fixture: ComponentFixture<QuizTimeLineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizTimeLineComponent]
    });
    fixture = TestBed.createComponent(QuizTimeLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
