import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemCruComponent } from './compnent-cru.component';

describe('SystemCruComponent', () => {
  let component: SystemCruComponent;
  let fixture: ComponentFixture<SystemCruComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemCruComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemCruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
