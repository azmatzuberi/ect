import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCommitmentComponent } from './view-commitment.component';

describe('ViewCommitmentComponent', () => {
  let component: ViewCommitmentComponent;
  let fixture: ComponentFixture<ViewCommitmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCommitmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCommitmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
