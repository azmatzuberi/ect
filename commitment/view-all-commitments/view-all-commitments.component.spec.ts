import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllCommitmentsComponent } from './view-all-commitments.component';

describe('ViewAllCommitmentsComponent', () => {
  let component: ViewAllCommitmentsComponent;
  let fixture: ComponentFixture<ViewAllCommitmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAllCommitmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllCommitmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
