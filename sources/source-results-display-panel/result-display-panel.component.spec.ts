import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultDisplayPanelComponent } from './result-display-panel.component';

describe('ResultDisplayPanelComponent', () => {
  let component: ResultDisplayPanelComponent;
  let fixture: ComponentFixture<ResultDisplayPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultDisplayPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultDisplayPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
