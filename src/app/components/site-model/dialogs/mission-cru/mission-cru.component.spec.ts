import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionCruComponent } from './mission-cru.component';

describe('MissionCruComponent', () => {
  let component: MissionCruComponent;
  let fixture: ComponentFixture<MissionCruComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissionCruComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionCruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
