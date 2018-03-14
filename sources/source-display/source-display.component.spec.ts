import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceDisplayComponent } from './source-display.component';

describe('SearchPanelComponent', () => {
  let component: SourceDisplayComponent;
  let fixture: ComponentFixture<SourceDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
