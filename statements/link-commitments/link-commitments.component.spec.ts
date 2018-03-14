import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkCommitmentsComponent } from './link-commitments.component';

describe('LinkCommitmentsComponent', () => {
  let component: LinkCommitmentsComponent;
  let fixture: ComponentFixture<LinkCommitmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkCommitmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkCommitmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
