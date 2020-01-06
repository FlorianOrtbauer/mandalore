import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierConfigurationComponent } from './supplier-configuration.component';

describe('SupplierConfigurationComponent', () => {
  let component: SupplierConfigurationComponent;
  let fixture: ComponentFixture<SupplierConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
