import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentCruComponent } from './component-cru.component';

describe('SystemCruComponent', () => {
  let component: ComponentCruComponent;
  let fixture: ComponentFixture<ComponentCruComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentCruComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentCruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
