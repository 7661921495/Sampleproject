import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerApiLogsComponent } from './partner-api-logs.component';

describe('PartnerApiLogsComponent', () => {
  let component: PartnerApiLogsComponent;
  let fixture: ComponentFixture<PartnerApiLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerApiLogsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartnerApiLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
