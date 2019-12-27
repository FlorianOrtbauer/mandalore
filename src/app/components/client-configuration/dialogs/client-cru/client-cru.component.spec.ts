import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCruComponent } from './client-cru.component';

describe('ClientCruComponent', () => {
  let component: ClientCruComponent;
  let fixture: ComponentFixture<ClientCruComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientCruComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientCruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
