import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierCruComponent } from './supplier-cru.component';

describe('SupplierCruComponent', () => {
  let component: SupplierCruComponent;
  let fixture: ComponentFixture<SupplierCruComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierCruComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierCruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
