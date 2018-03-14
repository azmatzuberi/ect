import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceYearsComponent } from './source-years.component';

describe('SourceYearsComponent', () => {
  let component: SourceYearsComponent;
  let fixture: ComponentFixture<SourceYearsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceYearsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceYearsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
