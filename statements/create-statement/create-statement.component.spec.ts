import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStatementComponent } from './create-statement.component';

describe('CreateStatementComponent', () => {
  let component: CreateStatementComponent;
  let fixture: ComponentFixture<CreateStatementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateStatementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
