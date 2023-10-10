import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTeamModalComponent } from './delete-team-modal.component';

describe('DeleteTeamModalComponent', () => {
  let component: DeleteTeamModalComponent;
  let fixture: ComponentFixture<DeleteTeamModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteTeamModalComponent]
    });
    fixture = TestBed.createComponent(DeleteTeamModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
