import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuestionModalComponent } from './add-question-modal.component';

describe('AddQuestionModalComponent', () => {
  let component: AddQuestionModalComponent;
  let fixture: ComponentFixture<AddQuestionModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddQuestionModalComponent]
    });
    fixture = TestBed.createComponent(AddQuestionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
