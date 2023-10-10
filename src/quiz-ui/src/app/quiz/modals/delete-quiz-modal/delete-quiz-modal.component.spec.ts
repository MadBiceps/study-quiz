import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteQuizModalComponent } from './delete-quiz-modal.component';

describe('DeleteQuizModalComponent', () => {
  let component: DeleteQuizModalComponent;
  let fixture: ComponentFixture<DeleteQuizModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteQuizModalComponent]
    });
    fixture = TestBed.createComponent(DeleteQuizModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
