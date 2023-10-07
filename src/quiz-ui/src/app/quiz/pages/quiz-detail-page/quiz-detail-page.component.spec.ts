import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizDetailPageComponent } from './quiz-detail-page.component';

describe('QuizDetailPageComponent', () => {
  let component: QuizDetailPageComponent;
  let fixture: ComponentFixture<QuizDetailPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizDetailPageComponent]
    });
    fixture = TestBed.createComponent(QuizDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
