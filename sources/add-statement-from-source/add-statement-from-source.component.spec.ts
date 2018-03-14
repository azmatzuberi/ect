import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStatementFromSourceComponent } from './add-statement-from-source.component';

describe('AddStatementFromSourceComponent', () => {
  let component: AddStatementFromSourceComponent;
  let fixture: ComponentFixture<AddStatementFromSourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStatementFromSourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStatementFromSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
