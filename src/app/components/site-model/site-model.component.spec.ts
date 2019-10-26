import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteModelComponent } from './site-model.component';

describe('SiteModelComponent', () => {
  let component: SiteModelComponent;
  let fixture: ComponentFixture<SiteModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
