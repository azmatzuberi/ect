import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitmentListingComponent } from './commitment-listing.component';

describe('CommitmentListingComponent', () => {
  let component: CommitmentListingComponent;
  let fixture: ComponentFixture<CommitmentListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommitmentListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitmentListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
