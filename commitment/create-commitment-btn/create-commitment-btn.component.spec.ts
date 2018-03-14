import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCommitmentBtnComponent } from './create-commitment-btn.component';

describe('CreateCommitmentBtnComponent', () => {
  let component: CreateCommitmentBtnComponent;
  let fixture: ComponentFixture<CreateCommitmentBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCommitmentBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCommitmentBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
