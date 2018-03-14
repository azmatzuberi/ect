import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuerySourceComponent } from './query-sources.component';

describe('QueryCommitmentComponent', () => {
  let component: QuerySourceComponent;
  let fixture: ComponentFixture<QuerySourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuerySourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuerySourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
