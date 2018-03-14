import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStatementBtnComponent } from './edit-statement-btn.component';

describe('EditStatementBtnComponent', () => {
  let component: EditStatementBtnComponent;
  let fixture: ComponentFixture<EditStatementBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditStatementBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStatementBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
