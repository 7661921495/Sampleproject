import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivationRequestComponent } from './activation-request.component';

describe('ActivationRequestComponent', () => {
  let component: ActivationRequestComponent;
  let fixture: ComponentFixture<ActivationRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivationRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivationRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
