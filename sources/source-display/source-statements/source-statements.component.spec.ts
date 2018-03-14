import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceStatementsComponent } from './source-statements.component';

describe('StatementDisplayComponent', () => {
  let component: SourceStatementsComponent;
  let fixture: ComponentFixture<SourceStatementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceStatementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceStatementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
