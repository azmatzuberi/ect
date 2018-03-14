import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSourceFromPdfBtnComponent } from './add-source-from-pdf-btn.component';

describe('AddSourceFromPdfBtnComponent', () => {
  let component: AddSourceFromPdfBtnComponent;
  let fixture: ComponentFixture<AddSourceFromPdfBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSourceFromPdfBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSourceFromPdfBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
