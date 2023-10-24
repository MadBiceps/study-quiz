import { TestBed } from '@angular/core/testing';

import { QuizAttemptService } from './quiz-attempt.service';

describe('QuizAttemptService', () => {
  let service: QuizAttemptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizAttemptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
