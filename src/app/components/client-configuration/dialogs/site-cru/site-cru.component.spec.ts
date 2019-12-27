import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteCruComponent } from './site-cru.component';

describe('SiteCruComponent', () => {
  let component: SiteCruComponent;
  let fixture: ComponentFixture<SiteCruComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteCruComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteCruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
