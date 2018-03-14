import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerDatatableDisplayComponent } from './statement-display.component';

describe('StatementDisplayComponent', () => {
  let component: StatementDisplayComponent;
  let fixture: ComponentFixture<StatementDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatementDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatementDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
