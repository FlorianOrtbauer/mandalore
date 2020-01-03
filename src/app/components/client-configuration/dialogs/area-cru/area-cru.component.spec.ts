import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaCruComponent } from './area-cru.component';

describe('AreaCruComponent', () => {
  let component: AreaCruComponent;
  let fixture: ComponentFixture<AreaCruComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaCruComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaCruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
