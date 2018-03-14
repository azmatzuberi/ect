import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceDetailsComponent } from './source-details.component';

describe('SearchPanelComponent', () => {
  let component: SourceDetailsComponent;
  let fixture: ComponentFixture<SourceDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
