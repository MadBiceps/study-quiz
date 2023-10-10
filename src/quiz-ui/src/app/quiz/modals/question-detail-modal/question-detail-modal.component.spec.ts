import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionDetailModalComponent } from './question-detail-modal.component';

describe('QuestionDetailModalComponent', () => {
  let component: QuestionDetailModalComponent;
  let fixture: ComponentFixture<QuestionDetailModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionDetailModalComponent]
    });
    fixture = TestBed.createComponent(QuestionDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
