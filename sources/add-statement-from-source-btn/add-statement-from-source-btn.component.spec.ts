import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStatementFromSourceBtnComponent } from './add-statement-from-source-btn.component';

describe('AddStatementFromSourceBtnComponent', () => {
  let component: AddStatementFromSourceBtnComponent;
  let fixture: ComponentFixture<AddStatementFromSourceBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStatementFromSourceBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStatementFromSourceBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
