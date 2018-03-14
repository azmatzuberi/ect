import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllStatementsComponent } from './view-all-statements.component';

describe('ViewAllStatementsComponent', () => {
  let component: ViewAllStatementsComponent;
  let fixture: ComponentFixture<ViewAllStatementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAllStatementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllStatementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
