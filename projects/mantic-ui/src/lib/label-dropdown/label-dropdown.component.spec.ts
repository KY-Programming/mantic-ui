import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelDropdownComponent } from './label-dropdown.component';

describe('LabelDropdownComponent', () => {
  let component: LabelDropdownComponent;
  let fixture: ComponentFixture<LabelDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
