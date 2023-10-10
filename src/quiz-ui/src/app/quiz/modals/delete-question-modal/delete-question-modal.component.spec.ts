import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteQuestionModalComponent } from './delete-question-modal.component';

describe('DeleteQuestionModalComponent', () => {
  let component: DeleteQuestionModalComponent;
  let fixture: ComponentFixture<DeleteQuestionModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteQuestionModalComponent]
    });
    fixture = TestBed.createComponent(DeleteQuestionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
