import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrierLogsComponent } from './carrier-logs.component';

describe('CarrierLogsComponent', () => {
  let component: CarrierLogsComponent;
  let fixture: ComponentFixture<CarrierLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarrierLogsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarrierLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
