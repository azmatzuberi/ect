import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSourceFromPdfComponent } from './add-source-from-pdf.component';

describe('AddSourceFromPdfComponent', () => {
  let component: AddSourceFromPdfComponent;
  let fixture: ComponentFixture<AddSourceFromPdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSourceFromPdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSourceFromPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
