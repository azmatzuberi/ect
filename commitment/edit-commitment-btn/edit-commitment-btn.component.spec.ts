import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCommitmentBtnComponent } from './edit-commitment-btn.component';

describe('EditCommitmentBtnComponent', () => {
  let component: EditCommitmentBtnComponent;
  let fixture: ComponentFixture<EditCommitmentBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCommitmentBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCommitmentBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
