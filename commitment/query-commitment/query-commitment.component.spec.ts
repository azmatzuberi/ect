import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryCommitmentComponent } from './query-commitment.component';

describe('QueryCommitmentComponent', () => {
  let component: QueryCommitmentComponent;
  let fixture: ComponentFixture<QueryCommitmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryCommitmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryCommitmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
