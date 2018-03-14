import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStatementComponent } from './add-statement.component';

describe('AddStatementComponent', () => {
  let component: AddStatementComponent;
  let fixture: ComponentFixture<AddStatementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStatementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
