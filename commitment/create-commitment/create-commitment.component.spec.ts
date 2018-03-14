import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCommitmentComponent } from './create-commitment.component';

describe('CreateCommitmentComponent', () => {
  let component: CreateCommitmentComponent;
  let fixture: ComponentFixture<CreateCommitmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCommitmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCommitmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
