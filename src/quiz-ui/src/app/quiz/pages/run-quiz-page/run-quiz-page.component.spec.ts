import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunQuizPageComponent } from './run-quiz-page.component';

describe('RunQuizPageComponent', () => {
  let component: RunQuizPageComponent;
  let fixture: ComponentFixture<RunQuizPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RunQuizPageComponent]
    });
    fixture = TestBed.createComponent(RunQuizPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
