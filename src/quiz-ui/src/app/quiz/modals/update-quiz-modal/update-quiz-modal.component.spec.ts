import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateQuizModalComponent } from './update-quiz-modal.component';

describe('UpdateQuizModalComponent', () => {
  let component: UpdateQuizModalComponent;
  let fixture: ComponentFixture<UpdateQuizModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateQuizModalComponent]
    });
    fixture = TestBed.createComponent(UpdateQuizModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
