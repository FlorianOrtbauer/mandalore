import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCruComponent } from './task-cru.component';

describe('TaskCruComponent', () => {
  let component: TaskCruComponent;
  let fixture: ComponentFixture<TaskCruComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskCruComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskCruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
