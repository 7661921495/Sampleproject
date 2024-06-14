import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsimActivationCodesComponent } from './esim-activation-codes.component';

describe('EsimActivationCodesComponent', () => {
  let component: EsimActivationCodesComponent;
  let fixture: ComponentFixture<EsimActivationCodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EsimActivationCodesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EsimActivationCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
