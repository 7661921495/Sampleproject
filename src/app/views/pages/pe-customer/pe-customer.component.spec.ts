import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeCustomerComponent } from './pe-customer.component';

describe('PeCustomerComponent', () => {
  let component: PeCustomerComponent;
  let fixture: ComponentFixture<PeCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeCustomerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
