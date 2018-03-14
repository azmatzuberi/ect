import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementListingComponent } from './statement-listing.component';

describe('StatementListingComponent', () => {
  let component: StatementListingComponent;
  let fixture: ComponentFixture<StatementListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatementListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatementListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
