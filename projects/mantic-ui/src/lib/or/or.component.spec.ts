import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrComponent } from './or.component';

describe('OrComponent', () => {
  let component: OrComponent;
  let fixture: ComponentFixture<OrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
