import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStatementBtnComponent } from './create-statement-btn.component';

describe('CreateStatementBtnComponent', () => {
  let component: CreateStatementBtnComponent;
  let fixture: ComponentFixture<CreateStatementBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateStatementBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStatementBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
