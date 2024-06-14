import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadAsnDeviceComponent } from './upload-asn-device.component';

describe('UploadAsnDeviceComponent', () => {
  let component: UploadAsnDeviceComponent;
  let fixture: ComponentFixture<UploadAsnDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadAsnDeviceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadAsnDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
