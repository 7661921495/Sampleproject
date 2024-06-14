import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsimQrcodeGenerationComponent } from './esim-qrcode-generation.component';

describe('EsimQrcodeGenerationComponent', () => {
  let component: EsimQrcodeGenerationComponent;
  let fixture: ComponentFixture<EsimQrcodeGenerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EsimQrcodeGenerationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EsimQrcodeGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
